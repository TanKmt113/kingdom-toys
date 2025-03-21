const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const { syncCartPrices } = require("./cartHandler/syncCartPrice");
const { BadRequestError } = require("../response/error.response");

class CartService {
  GetMe = async (userId) => {
    const cart = await cartModel.findOne({ user: userId }).populate({
      path: "items.product",
      select: "productName price discount images",
    });

    if (!cart || cart.items.length === 0) {
      return {
        user: userId,
        items: [],
        totalPrice: 0,
        finalPrice: 0,
      };
    }

    let totalPrice = 0;
    let finalPrice = 0;

    const updatedItems = [];

    for (const item of cart.items) {
      const product = item.product;

      if (!product) continue;

      const price = product.price;
      const discount = product.discount || 0;
      const quantity = item.quantity;

      const subTotal = quantity * price;
      const finalSubTotal = subTotal * (1 - discount / 100);

      item.price = price;
      item.discount = discount;

      totalPrice += subTotal;
      finalPrice += finalSubTotal;

      updatedItems.push({
        productId: product._id,
        productName: product.productName,
        quantity,
        price,
        discount,
        images: product.images,
        subTotal,
        finalSubTotal,
      });
    }

    cart.totalPrice = totalPrice;
    cart.finalPrice = finalPrice;
    await cart.save();

    return {
      user: cart.user,
      couponName: cart?.coupon?.CouponName || null,
      totalPrice,
      finalPrice,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      items: updatedItems,
    };
  };

  AddToCart = async (productId, quantity, userId) => {
    const product = await productModel.findById(productId);
    if (!product)
      throw new BadRequestError("Không tìm thấy sản phẩm: " + productId);

    if (product.quantity < quantity)
      throw new BadRequestError("Sản phẩm không đủ");

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, items: [], totalPrice: 0 });
    }

    let existingItem = cart.items.find(
      (item) => item.product.toString() == productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.quantity)
        throw new BadRequestError("Số lượng sản phẩm trong kho không đủ");

      existingItem.quantity = newQuantity;
    } else {
      existingItem = {
        product: productId,
        quantity,
      };
      cart.items.push(existingItem);
    }

    existingItem.price = product.price;
    existingItem.discount = product.discount;

    await syncCartPrices(cart);

    await cart.save();
    return cart;
  };

  UpdateCartItem = async (productId, quantity, userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng không tồn tại");

    const product = await productModel.findById(productId);
    if (!product) throw new BadRequestError("Sản phẩm không tồn tại");

    if (product.quantity < quantity)
      throw new BadRequestError("Sản phẩm không đủ");

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );
    if (itemIndex === -1)
      throw new BadRequestError("Sản phẩm không có trong giỏ hàng");

    if (quantity > 0) {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].price = product.price;
      cart.items[itemIndex].discount = product.discount;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await syncCartPrices(cart);

    await cart.save();
    return cart;
  };

  Remove = async (productId, userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new BadRequestError("Giỏ hàng không tồn tại");

    const itemExists = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!itemExists)
      throw new BadRequestError("Sản phẩm không có trong giỏ hàng");

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await syncCartPrices(cart);

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
