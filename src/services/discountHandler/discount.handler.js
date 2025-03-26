const { BadRequestError } = require("../../response/error.response");

class BasehandleDiscount {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  async handle(context) {
    if (this.nextHandler) {
      return this.nextHandler.handle(context);
    }
    return true;
  }
}

class ExpiryDateHandler extends BasehandleDiscount {
  async handle(context) {
    if (!context || typeof context !== "object") {
      throw new BadRequestError("Dữ liệu không hợp lệ!");
    }

    const { coupon } = context;

    if (!coupon || !coupon.expiryDate) {
      throw new BadRequestError("Coupon không hợp lệ hoặc không tồn tại!");
    }

    const expiryDate = new Date(coupon.expiryDate);
    const currentDate = new Date();

    if (isNaN(expiryDate.getTime())) {
      throw new BadRequestError("Ngày hết hạn coupon không hợp lệ!");
    }

    if (expiryDate < currentDate) {
      const couponName = coupon?.CouponName || "Không xác định";
      throw new BadRequestError(
        `Mã giảm giá ${couponName} đã hết hạn vào ngày ${expiryDate.toLocaleDateString()}`
      );
    }

    return super.handle(context);
  }
}

class MinOrderValueHandler extends BasehandleDiscount {
  async handle(context) {
    const { totalPrice, coupon } = context;
    if (totalPrice < coupon.minOrderValue)
      throw new BadRequestError(
        `Đơn hàng phải từ ${coupon.minOrderValue} mới áp dụng mã giảm giá`
      );

    return super.handle(context);
  }
}

class UsageLimitHandler extends BasehandleDiscount {
  async handle(context) {
    const { coupon } = context;
    if (coupon.usageLimit <= 0)
      throw new BadRequestError("Đã hết mã giảm giá này ");

    coupon.usageLimit--;
    await coupon.save();

    return super.handle(context);

  }
}
module.exports = {
  BasehandleDiscount,
  ExpiryDateHandler,
  MinOrderValueHandler,
  UsageLimitHandler,
};
