const productModel = require("../models/product.model");
const { parseFilterString, parsePriceToFilter } = require("../utils");
const { Pagination } = require("../response/success.response");

class ProductService {
  GetAll = async (
    skip = 0,
    limit = 30,
    filter = null,
    search = null,
    price = null,
    genre = null,
    sex = null,
    age = null
  ) => {
    let baseFilter = parseFilterString(filter, search, ["productName"]);

    let priceFilter = parsePriceToFilter(price);
    if (priceFilter) baseFilter = { ...baseFilter, ...priceFilter };

    if (genre) baseFilter.genre = genre;

    if (sex) baseFilter.sex = sex;

    if (age) {
      if (age.includes(":")) {
        const [minAge, maxAge] = age.split(":").map(Number);
        baseFilter.age = { $gte: minAge, $lte: maxAge };
      } else {
        baseFilter.age = Number(age);
      }
    }

    console.log(baseFilter)

    const total = await productModel.countDocuments(baseFilter);
    const products = await productModel
      .find(baseFilter)
      .populate("genre")
      .populate("brand")
      .skip(skip)
      .limit(limit);

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
    const newProduct = await productModel.create(data);
    return newProduct;
  };
}

module.exports = new ProductService();
