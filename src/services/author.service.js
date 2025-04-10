const authorModel = require("../models/author.model");
const { BadRequestError } = require("../response/error.response");
const { Pagination } = require("../response/success.response");

class AuthorService {
  CreateAuthor = async (payload) => {
    const data = await authorModel.create(payload);
    return data;
  };

  EditAuthor = async (id, data) => {
    const holderData = await authorModel.findOne({ _id: id });
    if (!holderData) throw new BadRequestError("Không tìm thấy tác giả");

    Object.assign(holderData, data);

    await holderData.save();
    return holderData;
  };

  GetAll = async (skip = 0, limit = 30, search = null) => {
    let filter = {};

    if (search) {
      const regex = { $regex: search.toString(), $options: "i" };

      filter = {
        $or: [{ authorName: regex }],
      };
    }

    const data = await authorModel.find(filter).skip(skip).limit(limit);

    const total = await authorModel.countDocuments(filter);

    return new Pagination({
      limit: limit,
      skip: skip,
      result: data,
      total: total,
    });
  };

  GetDetail = async (id) => {
    const holderData = await authorModel.findOne({ _id: id });
    if (!holderData) throw new BadRequestError("Không tìm thấy kết quả");
    return holderData;
  };

  Delete = async (id) => {
    const holderData = await authorModel.findOne({ _id: id });
    if (!holderData) throw new BadRequestError("Không tìm thấy kết quả");

    await holderData.deleteOne();

    return "Xóa thành công";
  };
}

module.exports = new AuthorService();
