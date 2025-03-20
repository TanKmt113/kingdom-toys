const productModel = require("../models/product.model");
const { parseFilterString } = require("../utils");
const { Pagination } = require("../response/success.response");

class ProductService {
  GetAll = async (skip = 1, limit = 30, filter = null, search = null) => {
    filter = parseFilterString(filter);

    const total = await productModel.countDocuments(filter);
    const products = await productModel
      .find(filter)
      .populate("genre")
      .populate("brand")
      .skip(skip)
      .limit(limit);
    console.log(filter);

    return new Pagination({
      limit: limit,
      skip: skip,
      result: products,
      total: total,
    });
  };

  GetById = async (id) => {
    const product = await productModel.findOne({ _id: id });
    return product;
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
