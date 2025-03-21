const couponModel = require("../models/coupon.model");
const { BadRequestError } = require("../response/error.response");
const { Pagination } = require("../response/success.response");
const cartModel = require("../models/cart.model");
const { parseFilterString } = require("../utils");
const { DISCOUNTTYPE } = require("../utils/enum");
const {
  ExpiryDateHandler,
  MinOrderValueHandler,
  UsageLimitHandler,
} = require("./discountHandler/discount.handler");

class CouponService {
  CheckingCoupon = async (userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Không tìm thấy giỏ hàng");

    const allCoupons = await couponModel.find();

    const validCoupons = allCoupons.filter((coupon) => {
      if (coupon.expiryDate < new Date()) return false;

      if (coupon.usageLimit <= 0) return false;

      if (cart.finalPrice < coupon.minOrderValue) return false;

      return true;
    });

    if (validCoupons.length == 0)
      throw new BadRequestError("Không có mã giảm giá hợp lệ");

    return validCoupons;
  };

  ApplyCoupon = async (couponCode, userId) => {
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng không tồn tại");

    const coupon = await couponModel.findOne({ _id: couponCode });
    if (!coupon) throw new BadRequestError("Mã giảm giá không hợp lệ");

    let totalPrice = 0;
    for (const item of cart.items) {
      totalPrice += item.quantity * item.price;
    }

    const context = {
      userId,
      totalPrice,
      coupon,
    };

    const expiryHandler = new ExpiryDateHandler();
    const minOrderHandler = new MinOrderValueHandler();
    const usageHandler = new UsageLimitHandler();

    expiryHandler.setNext(minOrderHandler).setNext(usageHandler);
    expiryHandler.handle(context);

    // await cart.save();
    return cart;
  };

  AddCoupon = async (data) => {
    const coupon = await couponModel.findOne({ CouponName: data.CouponName });
    if (coupon) throw new BadRequestError("Đã có coupon này rồi!");

    const couponSave = new couponModel(data);

    await couponSave.save();
    return couponSave;
  };

  UpdateCoupon = async (couponId, UpdatedData) => {
    const coupon = await couponModel.findOne({ _id: couponId });
    if (!coupon) throw new BadRequestError("Không tìm thấy coupon!");

    Object.assign(coupon, UpdatedData);

    await coupon.save();
    return coupon;
  };

  DeleteCoupon = async (couponId) => {
    const coupon = await couponModel.findOne({ _id: couponId });

    if (!coupon) throw new BadRequestError("Không tìm thấy coupon");

    await coupon.deleteOne();
    return "success";
  };

  GetCoupon = async (skip = 0, limit = 30, filter = null, search = null) => {
    filter = parseFilterString(filter, search, ["CouponName", "CouponValue"]);
    const total = await couponModel.countDocuments(filter);
    let coupon = await couponModel.find(filter).skip(skip).limit(limit);
    if (!coupon) throw new BadRequestError("Không tìm thấy coupon");

    return new Pagination({
      limit,
      skip,
      result: coupon,
      total,
    });
  };
}
module.exports = new CouponService();
