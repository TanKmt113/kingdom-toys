const { BadRequestError } = require("../../response/error.response");

class BasehandleDiscount {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(context) {
    if (this.nextHandler) {
      return this.nextHandler.handle(context);
    }
    return true;
  }
}

class ExpiryDateHandler extends BasehandleDiscount {
  handle(context) {
    const { coupon } = context;
    console.log(coupon);
    if (!coupon || !coupon.expiryDate)
      throw new BadRequestError("Coupon không hợp lệ hoặc không tồn tại!");

    const currentDate = new Date();
    if (coupon.expiryDate < currentDate)
      throw new BadRequestError(
        `Mã giảm giá ${
          coupon.CouponName
        } đã hết hạn vào ngày ${coupon.expiryDate.toLocaleDateString()} `
      );

    return super.handle(context);
  }
}

class MinOrderValueHandler extends BasehandleDiscount {
  handle(context) {
    const { totalPrice, coupon } = context;
    if (totalPrice < coupon.minOrderValue)
      throw new BadRequestError(
        `Đơn hàng phải từ ${coupon.minOrderValue} mới áp dụng mã giảm giá`
      );

    return super.handle(context);
  }
}

class UsageLimitHandler extends BasehandleDiscount {
  handle(context) {
    const { coupon } = context;
    if (coupon.usageLimit <= 0)
      throw new BadRequestError("Đã hết mã giảm giá này ");
    return super.handle(context);
  }
}
module.exports = {
  BasehandleDiscount,
  ExpiryDateHandler,
  MinOrderValueHandler,
  UsageLimitHandler,
};
