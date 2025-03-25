const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

class DashboardService {
  GetDashboasd = async () => {
    const productCount =await productModel.countDocuments();
    const orderCount = await orderModel.countDocuments();

    return { productCount, orderCount };
  };
}

module.exports = new DashboardService();
