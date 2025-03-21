const { SuccessResponse } = require("../response/success.response");
const AddressService = require("../services/address.service");

class AddressContrller {
  GetProvince = async (req, res) => {
    new SuccessResponse({
      message: "Get province",
      metadata: await AddressService.GetProvince(),
    }).send(res);
  };

  GetDistrict = async (req, res) => {
    const id = req.params.id;

    new SuccessResponse({
      message: "Get district",
      metadata: await AddressService.GetDistrict(id),
    }).send(res);
  };

  GetWard = async (req, res) => {
    const id = req.params.id;

    new SuccessResponse({
      message: "Get ward",
      metadata: await AddressService.GetWard(id),
    }).send(res);
  };
}

module.exports = new AddressContrller();
