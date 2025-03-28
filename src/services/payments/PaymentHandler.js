const axios = require("axios").default; // npm install axios
const cartModel = require("../../models/cart.model");
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const { BadRequestError } = require("../../response/error.response");
const configs = require("../../configs/index").configs;
const orderModel = require("../../models/order.model");
const { ORDERSTATUS } = require("../../utils/enum");

class PaymentHandler {
  async handler(order, payload) {
    throw new error("This method must be implemented");
  }
}

class CODPayment extends PaymentHandler {
  async handler(orderInput, userId) {
    const order = await orderModel.findOne({ _id: orderInput._id });
    if (!order) throw new BadRequestError("Order not found");
    order.status = ORDERSTATUS.PENDING;
    await cartModel.deleteOne({ _id: userId });
    await order.save();
    return order;
  }
}

class ZaloPayment extends PaymentHandler {
  async handler(orderInput, userId) {
    const items = orderInput.items;
    const orderId = orderInput._id;
    const transID = Math.floor(Math.random() * 1000000);
    const price = Number(orderInput.finalPrice);
    const user = orderInput.user.toString();

    const embed_data = {
      redirecturl: configs.ZALO_PAY.redirecturl,
      order: orderId,
    };

    const order = {
      app_id: configs.ZALO_PAY.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: user,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: price,
      callback_url: configs.ZALO_PAY.callback_url,
      description: `Payment for the order #${transID}`,
      bank_code: "",
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      configs.ZALO_PAY.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, configs.ZALO_PAY.key1).toString();

    try {
      const result = await axios.post(configs.ZALO_PAY.endpoint, null, {
        params: order,
      });

      await cartModel.deleteOne({ _id: userId });
      return result.data;
    } catch (error) {
      throw new BadRequestError("Payment failed: ", error);
    }
  }
}

module.exports = { CODPayment, ZaloPayment };
