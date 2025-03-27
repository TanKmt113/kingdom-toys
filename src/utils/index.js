const _ = require("lodash");
const { Types } = require("mongoose");

const URL_IMG = `${process.env.URL_SERVER}/uploads`;

const convertURL = (images) => {
  return images.map((image) => `${URL_IMG}/${image.filename}`);
};

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const convertToObjectIdMongose = (id) => {
  return new Types.ObjectId(id);
};

// ['a', 'b', 'c'] = {a: 1, b: 1, c: 1}
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const getUnSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const cleanObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      cleanObject(obj[key]);
    }
  });

  return obj;
};

const parseFilterString = (filterString, search = null, searchFields = []) => {
  if (!filterString || typeof filterString !== "string") return {};

  // Chuyển đổi filter thành object
  const filterObj = _.chain(filterString.split("&"))
    .map((pair) => pair.split("="))
    .fromPairs()
    .mapValues((value) => ({ $regex: new RegExp(value, "i") }))
    .value();

  // Nếu có search và danh sách trường cần tìm kiếm
  if (search && searchFields.length > 0) {
    const searchRegex = new RegExp(search, "i");
    filterObj.$or = searchFields.map((field) => ({ [field]: searchRegex }));
  }

  return filterObj;
};

const parsePriceToFilter = (price) => {
  if (!price) return null;

  const ranges = price.split(",");
  const orConditions = ranges.map((range) => {
    const [min, max] = range.split(":").map(Number);
    return { price: { $gte: min, $lte: max } };
  });
  return orConditions.length > 1 ? { $or: orConditions } : orConditions[0];
};

module.exports = {
  parsePriceToFilter,
  parseFilterString,
  getInfoData,
  getSelectData,
  getUnSelectData,
  cleanObject,
  convertToObjectIdMongose,
  convertURL,
};
