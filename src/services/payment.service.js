const orderModel = require("../models/order.model");
const { ORDERSTATUS } = require("../utils/enum");

class PaymentService {
  CallBack = async (payload) => {
    let dataStr = JSON.parse(payload.data);
    let { order } = JSON.parse(dataStr.embed_data);
    const orderData = await orderModel.findOne({ _id: order });
    if (!orderData) throw new BadRequestError("Order not found");
    console.log(orderData);

    orderData.status = ORDERSTATUS.PAID;

    await orderData.save();
  };
}

module.exports = new PaymentService();
