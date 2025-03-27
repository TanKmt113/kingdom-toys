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

    return { productCount, orderCount, totalPriceOfOrder };
  };
}

module.exports = new DashboardService();
