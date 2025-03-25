const orderService = require("../services/order.service");
const { SuccessResponse } = require("../response/success.response");

class OrderController {
  Checkout = async (req, res) => {
    const user = req.user;
    new SuccessResponse({
      message: "Checkout success",
      metadata: await orderService.Checkout(req.body, user.userId),
    }).send(res);
  };

  GetOrderById = async (req, res) => {
    const { id } = req.params;

    new SuccessResponse({
      message: "Get by id",
      metadata: await orderService.GetOrderById(id),
    }).send(res);
  };

  GetOrder = async (req, res) => {
    new SuccessResponse({
      message: "Get order success",
      metadata: await orderService.GetOrder(),
    }).send(res);
  };

  GetOrderDetail = async (req, res) => {
    const user = req.user;
    new SuccessResponse({
      message: "Get order detail success",
      metadata: await orderService.GetOrderDetail(user.userId),
    }).send(res);
  };
}

module.exports = new OrderController();
