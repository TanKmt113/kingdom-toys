const { PAYMENT_METHOD } = require("../../utils/enum");
const { CODPayment, ZaloPayment } = require("./PaymentHandler");

class PaymentFactory {
  static getHandler(method) {
    switch (method) {
      case PAYMENT_METHOD.COD:
        return new CODPayment();
      case PAYMENT_METHOD.ZALO:
        return new ZaloPayment();
      default:
        throw new Error("Invalid payment method");
    }
  }
}

module.exports = PaymentFactory;
