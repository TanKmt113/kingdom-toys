const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

class DashboardService {
  GetDashboasd = async () => {
    let totalPriceOfOrder = 0;
    const productCount = await productModel.countDocuments();
    const orderCount = await orderModel.countDocuments();

    const orderHolder = await orderModel.find();

    totalPriceOfOrder = orderHolder.reduce((acc, item) => {
      return acc + item.finalPrice;
    }, 0);

    let top5LatestOrders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    const mergedProducts = {};

    top5LatestOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = item.product;
        const productId = product._id.toString();

        if (!mergedProducts[productId]) {
          mergedProducts[productId] = {
            productId: productId,
            name: product.name,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: item.quantity,
          };
        } else {
          mergedProducts[productId].quantity += item.quantity;
        }
      });
    });
    const topProductsFromLatestOrders = Object.values(mergedProducts);
    return {
      productCount,
      orderCount,
      totalPriceOfOrder,
      topProductsFromLatestOrders,
    };
  };
}

module.exports = new DashboardService();
