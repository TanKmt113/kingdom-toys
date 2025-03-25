const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const { BadRequestError } = require("../../response/error.response");
const { syncCartPrices } = require("../cartHandler/syncCartPrice");

async function generateOrderItemFromCart(userId) {
  const cart = await cartModel.findOne({ user: userId });
  if (!cart || cart.items.length === 0)
    throw new BadRequestError("Giỏ hàng trống");

  await syncCartPrices(cart);
  await cart.save();

  let items = [];
  let totalPrice = 0;
  let finalPrice = 0;

  for (const item of cart.items) {
    if (!item.product) continue;

    const quantity = item.quantity;
    const discount = item.discount || 0;
    const price = item.price;

    totalPrice += quantity * price;
    finalPrice += quantity * price * (1 - discount / 100);

    items.push({
      product: item.product,
      quantity,
      discount,
      price,
    });
  }


  return { items, totalPrice, finalPrice, cart };
}

async function generateOrderItemsFromProduct(productId, quantity = 1) {
  const product = await productModel.findOne({ _id: productId });
  if (!product) throw new BadRequestError("Sản phẩm không tồn tại");

  const price = product.price;
  const discount = product.discount || 0;

  const totalPrice = quantity * price;
  const finalPrice = quantity * price * (1 - discount / 100);

  return {
    items: [
      {
        product: product._id,
        quantity,
        discount,
        price,
      },
    ],
    totalPrice,
    finalPrice,
  };
}

module.exports = {
  generateOrderItemFromCart,
  generateOrderItemsFromProduct,
};
