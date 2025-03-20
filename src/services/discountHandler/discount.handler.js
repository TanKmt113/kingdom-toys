const { BadRequestError } = require("../../response/error.response");

class BasehandleDiscount {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(cart, coupon) {
    if (this.nextHandler) {
      return this.nextHandler.handle(cart, coupon);
    }
    return true;
  }
}

class ExpiryDateHandler extends BasehandleDiscount {
  handle(cart, coupon) {
    if (!coupon || !coupon.expiryDate)
      throw new BadRequestError("Coupon không hợp lệ hoặc không tồn tại!");

    const currentDate = new Date();
    if (coupon.expiryDate < currentDate)
      throw new BadRequestError(
        `Mã giảm giá ${
          coupon.CouponName
        } đã hết hạn vào ngày ${coupon.expiryDate.toLocaleDateString()} `
      );

    return super.handle(cart, coupon);
  }
}

class MinOrderValueHandler extends BasehandleDiscount {
  handle(cart, coupon) {
    if (cart.totalPrice < coupon.minOrderValue)
      throw new BadRequestError(
        `Đơn hàng phải từ ${coupon.minOrderValue} mới áp dụng mã giảm giá`
      );

    return super.handle(cart, coupon);
  }
}

class UsageLimitHandler extends BasehandleDiscount {
  handle(cart, coupon) {
    if (coupon.usageLimit <= 0)
      throw new BadRequestError("Đã hết mã giảm giá này ");
    return super.handle(cart, coupon);
  }
}
module.exports = {
  BasehandleDiscount,
  ExpiryDateHandler,
  MinOrderValueHandler,
  UsageLimitHandler,
};
