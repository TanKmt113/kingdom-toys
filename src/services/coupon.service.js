const couponModel = require("../models/coupon.model");
const { BadRequestError } = require("../response/error.response");
const { Pagination } = require("../response/success.response");
const cartModel = require("../models/cart.model");
const { parseFilterString } = require("../utils");
const { DISCOUNTTYPE } = require("../utils/enum");

class CouponService {
  ApplyConpoen = async (couponCode, userId) => {
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng không tồn tại");

    const coupon = await couponModel.findOne({ CouponName: couponCode });
    if (!coupon) throw new BadRequestError("Mã giảm giá không hợp lệ");

    if (coupon.expiryDate < new Date())
      throw new BadRequestError("Mã giảm giá đã hết hạn");

    if (cart.finalPrice < coupon.minOrderValue)
      throw new BadRequestError(
        `Đơn hàng phải từ ${coupon.minOrderValue} mới áp dụng được khuyến mĩa`
      );

    let discountAmount = 0;
    if (coupon.CouponType == DISCOUNTTYPE.PERCENT) {
      discountAmount = cart.totalPrice * (coupon.CouponValue / 100);
    } else if (coupon.CouponType == DISCOUNTTYPE.FIXED) {
      discountAmount = coupon.CouponValue;
    }

    cart.discountCode = couponCode;
    cart.discountValue = discountAmount;
    cart.finalPrice = cart.totalPrice - discountAmount;
    await cart.save();

    return cart;
  };

  AddCoupon = async ({ CouponName, CouponValue }) => {
    const coupon = await couponModel.findOne({ CouponName: CouponName });
    if (coupon) throw new BadRequestError("Đã có coupon này rồi!");

    const couponSave = new couponModel({
      CouponName: CouponName,
      CouponValue: CouponValue,
    });

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
    console.log(filter);
    const total = await couponModel.countDocuments(filter);
    const coupon = await couponModel.find(filter).skip(skip).limit(limit);
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
