const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");
const { BadRequestError } = require("../response/error.response");
const { syncCartPrices } = require("./cartHandler/syncCartPrice");
const { ORDERSTATUS } = require("../utils/enum");
const {
  ExpiryDateHandler,
  MinOrderValueHandler,
  UsageLimitHandler,
} = require("./discountHandler/discount.handler");
const couponModel = require("../models/coupon.model");

class OrderService {
  Checkout = async (payload, userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng trống");

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
        product: item._id,
        quantity: quantity,
        discount: discount,
        price: price,
      });
    }

    let discountvalue = 0;
    let couponId = null;

    if (payload.coupon) {
      const coupon = await couponModel.findById(payload.coupon);
      if (!coupon) throw new BadRequestError("Mã giảm giá không tồn tại");

      const expiryHandler = new ExpiryDateHandler();
      const minOrderHandler = new MinOrderValueHandler();
      const usageHandler = new UsageLimitHandler();

      expiryHandler.setNext(minOrderHandler).setNext(usageHandler);

      const context = {
        userId: userId,
        totalPrice: finalPrice,
        coupon: coupon,
      };
      expiryHandler.handle(context);

      discountvalue = coupon.CouponValue || 0;
      couponId = coupon._id;

      finalPrice -= discountvalue;

      if (finalPrice < 0) finalPrice = 0;
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

    //Xóa giỏ hàng
    await cart.deleteOne();

    await order.save();

    return order;
  };

  GetOrder = async(userId) => {
    const orders = await orderModel.find({user: userId})
    return orders
  }
}

module.exports = new OrderService();
