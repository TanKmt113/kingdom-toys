const productModel = require("../../models/product.model");

const syncCartPrices = async (cart) => {
  let totalPrice = 0;
  let finalPrice = 0;

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);

    if (!product) continue;

    item.price = product.price;
    item.discount = product.discount || 0;

    const quantity = item.quantity;

    totalPrice += quantity * item.price;
    finalPrice += quantity * item.price * (1 - item.discount / 100);
  }

  cart.totalPrice = totalPrice;
  cart.finalPrice = finalPrice;
};

module.exports = { syncCartPrices };
