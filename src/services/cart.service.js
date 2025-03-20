const cartModel = require("../models/cart.model");
const couponModel = require("../models/coupon.model");
const productModel = require("../models/product.model");
const { BadRequestError } = require("../response/error.response");

class CartService {
  GetMe = async (userId) => {
    const holderCart = await cartModel.findOne({ user: userId }).populate({
      path: "items.product",
    });
    // .populate("user");
    const formatJson = {
      user: holderCart.user,
      totalPrice: holderCart.totalPrice,
      discountCode: holderCart.discountCode,
      discountValue: holderCart.discountValue,
      finalPrice: holderCart.finalPrice,
      createdAt: holderCart.createdAt,
      updatedAt: holderCart.updatedAt,
      items: holderCart.items.map((item) => ({
        productId: item.product._id,
        productName: item.product.productName,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
      })),
    };
    return formatJson ?? [];
  };

  AddToCart = async (productId, quantity, userId) => {
    const product = await productModel.findById(productId);
    if (!product)
      throw new BadRequestError("Không tìm thấy sản phẩm: ", productId);

    if (product.quantity < quantity)
      throw new BadRequestError("Sản phẩm không đủ");

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() == productId
    );

    if (existingItem) existingItem.quantity += quantity;
    else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        discount: product.discount,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => (sum += item.quantity * item.price),
      0
    );
    cart.finalPrice = cart.items.reduce(
      (sum, item) =>
        sum + item.quantity * item.price * (1 - item.discount / 100),
      0
    );

    await cart.save();

    return cart;
  };

  UpdateCartItem = async (productId, quantity, userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng không tồn tại");

    const product = await productModel.findOne({ _id: productId });
    if (!product) throw new BadRequestError("Sản phẩm không tồn tại");

    if (product.quantity < quantity)
      throw new BadRequestError("Sản phẩm không đủ");

    const item = cart.items.find((item) => item.product == productId);
    if (!item) throw new BadRequestError("Sản phẩm không có trong giỏ hàng");

    if (quantity > 0) item.quantity = quantity;
    else
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );

    cart.totalPrice = cart.items.reduce(
      (sum, item) => (sum += item.quantity * item.price),
      0
    );

    if (cart.discountCode) {
      const coupon = await couponModel.findOne({
        CouponName: cart.discountCode,
      });

      if (!coupon || cart.totalPrice < coupon.minOrderValue) {
        cart.discountCode = null;
        cart.discountValue = 0;
        cart.finalPrice = cart.totalPrice;
      }
    }

    await cart.save();
    return cart;
  };

  Remove = async (productId, userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng không tồn tại");

    const item = cart.items.find((item) => item.product == productId);
    if (!item) throw new BadRequestError("Sản phẩm không có trong giỏ hàng");

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.totalPrice = cart.items.reduce(
      (sum, item) => (sum += item.quantity * item.price),
      0
    );

    await cart.save();
    return cart;
  };

  ClearCart = async (userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng không tồn tại");

    await cartModel.findOneAndDelete({ user: userId });
    return "Xóa thành công";
  };
}

module.exports = new CartService();
