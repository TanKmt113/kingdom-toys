const nationService = require("../services/nation.service");
const { SuccessResponse } = require("../response/success.response");

class NationController {
  AsyncData = async (req, res) => {
    new SuccessResponse({
      message: "Async data success",
      metadata: await nationService.AsyncData(),
    }).send(res);
  };

  GetAll = async (req, res) => {
    const { skip, limit } = req.query;
    new SuccessResponse({
      message: "Get All success",
      metadata: await nationService.GetAll(skip, limit),
    }).send(res);
  };

  GetByName = async (req, res) => {
    const { name } = req.params;
    new SuccessResponse({
      message: "Get by name",
      metadata: await nationService.GetByName(name),
    }).send(res);
  };
}

module.exports = new NationController();
