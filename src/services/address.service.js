const provinceModel = require("../models/province.model");
const wardModel = require("../models/ward.model");
const districtModel = require("../models/district.model");

class AddressService {
  GetProvince = async () => {
    const data = await provinceModel.find();
    return data;
  };

  GetDistrict = async (id) => {
    const data = await districtModel.find({ ProvinceCode: id });
    return data;
  };

  GetWard = async (id) => {
    const data = await wardModel.find({ DistrictCode: id });
    return data
  };
}

module.exports = new AddressService();
