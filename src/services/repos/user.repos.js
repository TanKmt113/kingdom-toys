const userModel = require("../../models/user.model");

const GetUserById = async (id) => {
  return userModel.findOne({ _id: id });
};

module.exports = { GetUserById };
