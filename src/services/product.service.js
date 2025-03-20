const productModel = require("../models/product.model");

class ProductService {
  GetAll = async (skip = 0, limit = 30) => {
    const products = await productModel
      .find()
      .populate("genre")
      .populate("brand")
      .skip(skip)
      .limit(limit);
    return products;
  };

  GetById = async (id) => {
    const product = await productModel.findOne({ _id: id });
    return products;
  };

  Update = async (id, data) => {
    const productUpdated = await productModel.updateOne({ _id: id }, data);
    return productUpdated;
  };

  Delete = async (id) => {
    const productDeleted = await productModel.deleteOne({ _id: id });
    return productDeleted;
  };

  Create = async (data) => {
    console.log(data);
    const newProduct = await productModel.create(data);
    return newProduct;
  };
}

module.exports = new ProductService();
