const couponModel = require("../../models/coupon.model");
const { BadRequestError } = require("../../response/error.response");
const {
  ExpiryDateHandler,
  MinOrderValueHandler,
  UsageLimitHandler,
} = require("../discountHandler/discount.handler");

const validateAndApplyCoupon = async (couponId, userId, finalPrice) => {
  const coupon = await couponModel.findById(couponId);

  if (!coupon) throw new BadRequestError("Mã giảm giá không tồn tại");

  const expiryHandler = new ExpiryDateHandler();
  const minOrderHandler = new MinOrderValueHandler();
  const usageHandler = new UsageLimitHandler();

  expiryHandler.setNext(minOrderHandler).setNext(usageHandler);

  const context = { userId, totalPrice: finalPrice, coupon };
  await expiryHandler.handle(context);

  let discountValue = coupon.CouponValue || 0;
  finalPrice -= discountValue;
  if (finalPrice < 0) finalPrice = 0;

  return { discountValue, finalPrice, couponId: coupon._id };
};

module.exports = { validateAndApplyCoupon };
