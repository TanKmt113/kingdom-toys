const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");
const { BadRequestError } = require("../response/error.response");
const { syncCartPrices } = require("./cartHandler/syncCartPrice");
const { ORDERSTATUS } = require("../utils/enum");

const { parseFilterString } = require("../utils");
const { Pagination } = require("../response/success.response");
const PaymentHandler = require("./payments/PaymentFactor");
const {
  validateAndApplyCoupon,
} = require("./ValidateOrder/validateAndApplyCoupon");
const { default: mongoose } = require("mongoose");

class OrderService {
  Checkout = async (payload, userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng trống");
    if (!payload.paymentMethod)
      throw new BadRequestError("Không có phương thức thanh toán");
    await syncCartPrices(cart);
    await cart.save();

    let totalPrice = 0;
    let finalPrice = 0;
    const orderItem = [];

    for (const item of cart.items) {
      if (!item.product) continue;

      const quantity = item.quantity;
      const discount = item.discount || 0;
      const price = item.price;

      totalPrice += quantity * price;
      finalPrice += quantity * price * (1 - discount / 100);

      orderItem.push({
        product: item.product,
        quantity: quantity,
        discount: discount,
        price: price,
      });
    }

    let discountvalue = 0;
    let couponId = null;

    if (payload.coupon) {
      const result = await validateAndApplyCoupon(
        payload.coupon,
        userId,
        finalPrice
      );

      discountvalue = result.discountValue;
      couponId = result.couponId;
      finalPrice = result.finalPrice;
    }

    const order = new orderModel({
      items: orderItem,
      finalPrice: finalPrice,
      totalPrice: totalPrice,
      status: ORDERSTATUS.PENDING,
      shippingAddress: {
        addressLine: payload.addressLine,
        district: payload.district,
        phone: payload.phone,
        fullName: payload.fullName,
        province: payload.province,
        ward: payload.ward,
      },
      notes: payload.notes,
      paymentMethod: payload.paymentMethod,
      user: userId,
      coupon: couponId,
      isDeleted: false,
    });

    await order.save();

    const paymentHandler = PaymentHandler.getHandler(payload.paymentMethod);
    await paymentHandler.handler(order, payload);

    //Xóa giỏ hàng
    await cart.deleteOne();
    await session.commitTransaction();
    session.endSession();
    return order;
  };

  GetOrder = async (skip = 0, limit = 30, filter = null, search = null) => {
    filter = parseFilterString(filter, search, ["status"]);

    const total = await orderModel.countDocuments(filter);
    const rawOrders = await orderModel
      .find(filter)
      .populate("coupon")
      .populate("items.product")
      .populate({
        path: "user",
        select: "name email status thumbnail phone address",
      })
      .sort({ createdAt: -1 });

    const orders = rawOrders.map((order) => {
      const flatItems = order.items.map((item) => {
        const product = item.product || {}; // fallback nếu null
        return {
          _id: item._id,
          productId: product._id,
          productName: product.productName,
          images: product.images,
          price: item.price,
          quantity: item.quantity,
          discount: item.discount,
        };
      });

      return {
        ...order.toObject(), // convert từ mongoose document về plain object
        items: flatItems,
      };
    });

    return new Pagination({
      limit: limit,
      skip: skip,
      result: orders,
      total: total,
    });
  };

  GetOrderByMe = async () => {
    const order = await orderModel
      .find({ user: userId })
      .populate("coupon")

      .sort({ createdAt: -1 });
    return order;
  };
}

module.exports = new OrderService();
