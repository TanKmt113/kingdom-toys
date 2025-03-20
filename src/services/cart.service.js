const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const { BadRequestError } = require("../response/error.response");

class CartService {
  GetMe = async (userId) => {
    const holderCart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");
    return holderCart ?? [];
  };

  AddToCart = async (productId, quantity, userId) => {
    const product = await productModel.findById(productId);
    if (!product)
      throw new BadRequestError("Không tìm thấy sản phẩm: ", productId);

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() == productId
    );

    if (existingItem) existingItem.quantity += quantity;
    else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => (sum += item.quantity * item.price),
      0
    );

    await cart.save();

    return cart;
  };
}

module.exports = new CartService();
