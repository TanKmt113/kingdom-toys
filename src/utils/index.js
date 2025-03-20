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

const parseFilterString = (filterString) => {
  if (!filterString || typeof filterString !== "string") return {};

  // Tách nhiều cặp key=value bằng dấu "&"
  const pairs = filterString.split("&").map(pair => pair.split("="));

  // Dùng lodash để chuyển thành object
  const filterObj = _.fromPairs(pairs);

  // Chuyển đổi thành điều kiện tìm kiếm Mongoose ($regex)
  return _.mapValues(filterObj, value => ({ $regex: new RegExp(value, "i") }));
};




module.exports = {
  parseFilterString,
  getInfoData,
  getSelectData,
  getUnSelectData,
  cleanObject,
  convertToObjectIdMongose,
  convertURL
};
