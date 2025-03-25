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

const {
  generateOrderItemFromCart,
  generateOrderItemsFromProduct,
} = require("./Order/orderItem.helper");

const ORDER_ITEM_GENERATORS = {
  CART: async (payload, userId) => await generateOrderItemFromCart(userId),
  NOW: async (payload, userId) =>
    await generateOrderItemsFromProduct(payload.productId, payload.quantity),
};

class OrderService {
  Checkout = async (payload, userId) => {
    if (!payload.paymentMethod)
      throw new BadRequestError("Không có phương thức thanh toán");

    const type = payload.type;
    if (!type) throw new BadRequestError("Vui lòng kiểu thanh toán");
    const strategy = ORDER_ITEM_GENERATORS[type];

    if (!strategy)
      throw new BadRequestError(` Loại giỏ hàng không hợp lệ: ${type}`);

    const { items, totalPrice, finalPrice, cart } = await strategy(
      payload,
      userId
    );

    let discountvalue = 0;
    let couponId = null;

    let finalPriceAfterCoupon = finalPrice;

    if (payload.coupon) {
      const result = await validateAndApplyCoupon(
        payload.coupon,
        userId,
        finalPrice
      );

      discountvalue = result.discountValue;
      couponId = result.couponId;
      finalPriceAfterCoupon = result.finalPrice;
    }

    const order = new orderModel({
      items,
      totalPrice,
      finalPrice: finalPriceAfterCoupon,
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
    if (cart) await cart.deleteOne();

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
