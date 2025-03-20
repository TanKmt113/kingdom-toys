const { DISCOUNTTYPE } = require("../../utils/enum");

class PercentDiscount {
  constructor(discountValue) {
    this.discountValue = discountValue;
  }

  apply(cartTotal) {
    return cartTotal * (this.discountValue / 100);
  }
}

class FixedDiscount {
  constructor(discountValue) {
    this.discountValue = discountValue;
  }
  apply(cartTotal) {
    return this.discountValue;
  }
}

class DiscountFactory {
  static getDiscountValue(cart, coupon) {
    if (!coupon) return null;

    if (coupon.CouponType == DISCOUNTTYPE.PERCENT) {
      return new PercentDiscount.apply(coupon.CouponValue);
    } else if ((coupon.CouponType = DISCOUNTTYPE.FIXED)) {
      return new FixedDiscount.apply(coupon.CouponValue);
    }
    return null;
  }
}

module.exports = DiscountFactory;
