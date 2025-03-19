const cartService = require("../services/cart.service");
const { SuccessResponse } = require("../response/success.response");

class CartController {
  GetMe = async () => {
    const user = req.user;
    new SuccessResponse({
      message: "Get cart success",
      metadata: await cartService.GetMe(user.userId),
    }).send(res);
  };
}

module.exports = new CartController();
