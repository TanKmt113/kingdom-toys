const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const accountModel = require("../models/user.model");

class DashboardService {
  GetDashboasd = async () => {
    let totalPriceOfOrder = 0;
    const productCount = await productModel.countDocuments();
    const orderCount = await orderModel.countDocuments();

    const orderHolder = await orderModel.find();

    totalPriceOfOrder = orderHolder.reduce((acc, item) => {
      return acc + item.finalPrice;
    }, 0);
    const mergedProducts = {};
    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("items.product", "productName price images")
      .lean();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const product = item.product;

        // Bỏ qua nếu product bị null do populate fail
        if (!product || !product._id) return;

        const productId = product._id.toString();

        if (!mergedProducts[productId]) {
          mergedProducts[productId] = {
            productId: productId,
            name: product.productName,
            price: product.price,
            thumbnail: product.images,
            quantity: item.quantity,
          };
        } else {
          mergedProducts[productId].quantity += item.quantity;
        }
      });
    });

    // Convert sang array để trả về
    const items = Object.values(mergedProducts);

    const clientUser = await accountModel.countDocuments({ role: "C" });
    return {
      productCount,
      orderCount,
      totalPriceOfOrder,
      top5LastestProducts: items,
      clientUer: clientUser,
    };
  };
}

module.exports = new DashboardService();
