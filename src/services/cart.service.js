const cartModel = require("../models/cart.model");
const { BadRequestError } = require("../response/error.response");

class CartService {
  GetMe = async (userId) => {
    const holderCart = await cartModel.findOne({ user: userId });
    if (!holderCart) throw new BadRequestError("Deo tim thay gio hang dau ");
    return holderCart;
  };
}

module.exports = new CartService();
