const genreModel = require("../models/genre.model");
const { convertToObjectIdMongose } = require("../utils");
const { NotFoundError } = require("../response/error.response");
class GenreService {
  GetAll = async (search = null, skip = 0, limit = 30) => {
    let filter = {};
    if (search) {
      const regex = { $regex: null, options: "i" };
      filter = {
        $or: [{ genreName: regex }],
      };
    }
    const response = await genreModel.find(regex).skip(skip).limit(limit);
    return response;
  };

  GetById = async (id) => {
    const response = await genreModel.findOne({ _id: id });
    return response;
  };

  Create = async (data) => {
    const result = await genreModel.create(data);
    return result;
  };

  Update = async (id, data) => {
    const result = await genreModel.findOne({
      _id: convertToObjectIdMongose(id),
    });
    if (!result) throw new NotFoundError("data not found");

    await genreModel.updateOne({ _id: id }, data);
    return true;
  };

  Delete = async (id) => {
    const result = await genreModel.findOne({
      _id: convertToObjectIdMongose(id),
    });

    if (!result) throw new NotFoundError("data not found");

    await genreModel.deleteOne({ _id: id });
    return true;
  };
}

module.exports = new GenreService();
