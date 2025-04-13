const productModel = require("../models/product.model");
const genreModel = require("../models/genre.model");
const brandModel = require("../models/brand.model");
const { parsePriceToFilter, convertToObjectIdMongose } = require("../utils");
const { Pagination } = require("../response/success.response");
const { BadRequestError } = require("../response/error.response");

class ProductService {
  GetAll = async (
    skip = 0,
    limit = 30,
    filter = null,
    search = " ",
    price = null,
    genre = null,
    sex = null,
    age = null,
    type = null
  ) => {
    let baseFilter = {};
    const searchStr = String(search).trim();

    if (searchStr) {
      baseFilter = {
        $or: [{ productName: { $regex: searchStr, $options: "i" } }],
      };
    }

    let priceFilter = parsePriceToFilter(price);
    if (priceFilter) baseFilter = { ...baseFilter, ...priceFilter };

    if (genre) {
      baseFilter.$or = [{ brand: genre }, { genre: genre }];
    }

    if (sex) baseFilter.sex = sex;

    if (age) {
      if (age.includes(":")) {
        const [minAge, maxAge] = age.split(":").map(Number);
        baseFilter.age = { $gte: minAge, $lte: maxAge };
      } else {
        baseFilter.age = Number(age);
      }
    }

    console.log(baseFilter);

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

  GetProductByName = async (name, skip, limit) => {
    console.log(name);
    const holder = await brandModel.findOne({
      brandName: { $regex: name.toString(), $options: "i" },
    });

    const products = await productModel
      .findOne({ brand: holder._id })
      .skip(skip)
      .limit(limit);
    return products;
  };

  GetById = async (id) => {
    const product = await productModel
      .findOne({
        _id: convertToObjectIdMongose(id),
      })
      .populate("brand")
      .populate("genre")
      .populate({
        path: "comments.user",
      });

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

  AddComment = async (id, payload, user) => {
    const { content, rating } = payload;

    const product = await productModel.findOne({ _id: id });
    if (!product) throw new BadRequestError("Thêm bình luận");

    product.comments.push({
      user: user,
      content: content,
      rating: rating,
    });

    await product.save();
    return "Success";
  };

  RemoveComment = async (id, commentId, user) => {
    const product = await productModel.findOne({ _id: id });
    if (!product) throw new BadRequestError("Không tìm thấy sản phẩm");

    const commentIndex = product.comments.findIndex(
      (comment) =>
        comment._id.toString() === commentId &&
        comment.user.toString() === user.toString()
    );

    if (commentIndex == -1)
      throw new BadRequestError("Không tìm thấy bình luộn");

    product.comments.pull({ _id: commentId });

    await product.save();

    return "Comment removed successfully";
  };
}

module.exports = new ProductService();
