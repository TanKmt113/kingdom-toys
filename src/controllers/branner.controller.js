const { SuccessResponse } = require("../response/success.response");
const BrannerService = require("../services/branner.service");
class BrannerController {
  GetAll = async (req, res) => {
    new SuccessResponse({
      message: "GetAll",
      metadata: await BrannerService.GetAll(),
    }).send(res);
  };

  Create = async (req, res) => {
    new SuccessResponse({
      message: "Create success",
      metadata: await BrannerService.Create(req.body),
    }).send(res);
  };

  Delete = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "Delete success",
      metadata: await BrannerService.Delete(id),
    }).send(res);
  };

  Update = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "Update success",
      metadata: await BrannerService.Update(id, req.body),
    }).send(res);
  };
}

module.exports = new BrannerController();
