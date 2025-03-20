const cartService = require("../services/cart.service");
const { SuccessResponse } = require("../response/success.response");

class CartController {
  GetMe = async (req, res) => {
    const user = req.user;
    new SuccessResponse({
      message: "Get cart success",
      metadata: await cartService.GetMe(user.userId),
    }).send(res);
  };

  AddToCart = async (req, res) => {
    const user = req.user;
    const { productId, quantity } = req.body;
    new SuccessResponse({
      message: "Add to cart success",
      metadata: await cartService.AddToCart(productId, quantity, user.userId),
    }).send(res);
  };

  UpdateQuantity = async (req, res) => {
    const user = req.user;
    const { productId, quantity } = req.body;
    new SuccessResponse({
      message: "Update quantity success",
      metadata: await cartService.UpdateCartItem(
        productId,
        quantity,
        user.userId
      ),
    }).send(res);
  };

  RemoveItem = async (req, res) => {
    const user = req.user;
    const { productId } = req.body;

    new SuccessResponse({
      message: "Remove item success",
      metadata: await cartService.Remove(productId, user.userId),
    }).send(res);
  };

  ClearAll = async (req, res) => {
    const user = req.user;

    new SuccessResponse({
      message: "Clear cart success",
      metadata: await cartService.ClearCart(user.userId),
    }).send(res);
  };
}

module.exports = new CartController();
