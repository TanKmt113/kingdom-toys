const nationModel = require("../models/nation.model");
const fs = require("fs");
const path = require("path");

class NationService {
  AsyncData = async () => {
    const filePath = path.join(__dirname, "../../nation.json");
    const fileData = fs.readFileSync(filePath, "utf8");

    const nations = JSON.parse(fileData);

    for (let nation of nations) {
      const existingData = await nationModel.findOne({ code: nation.name });
      if (!existingData) {
        const newNation = new nationModel(nation);
        await newNation.save();
      }
    }
    return "Async data success";
  };

  GetAll = async (skip = 0, limit = 30) => {
    const holder = await nationModel.find().skip(skip).limit(limit);
    return holder;
  };

  GetByName = async (id) => {
    const holder = await nationModel.findOne({ _id: id });
    return holder;
  };
}

module.exports = new NationService();
