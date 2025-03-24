const brannerModel = require("../models/branner.model");

class BrannerService {
  GetAll = async () => {
    const branners = await brannerModel.find();
    return branners;
  };

  Create = async (data) => {
    const branner = await brannerModel.create(data);
    return branner;
  };

  Update = async (id, data) => {
    const branner = await brannerModel.findOne({ _id: id });
    if (!branner) throw new BadRequestError("Branner not found");
    Object.assign(branner, data);
    await branner.save();
    return branner;
  };

  Delete = async (id) => {
    const branner = await brannerModel.findOne({ _id: id });
    if (!branner) throw new BadRequestError("Branner not found");
    await brannerModel.deleteOne({ _id: id });

    return true;
  };
}

module.exports = new BrannerService();
