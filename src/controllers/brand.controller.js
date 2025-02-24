const brandServices = require("../services/brand.service");
const { SuccessResponse } = require("../response/success.response");

class BrandController {
  GetAll = async (req, res) => {
    const { skip, limit } = req.query;

    new SuccessResponse({
      message: "Get all success",
      metadata: await brandServices.GetAll(skip, limit),
    }).send(res);
  };
  GetById = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "Get by id success",
      metadata: await brandServices.GetById(id),
    }).send(res);
  };
  Delete = async (req, res) => {
    const { id } = req.params;

    new SuccessResponse({
      message: "Delete success",
      metadata: await brandServices.Delete(id),
    }).send(res);
  };
  Update = async (req, res) => {
    const { id } = req.params;

    new SuccessResponse({
      message: "Update success",
      metadata: await brandServices.Update(id, req.body),
    }).send(res);
  };
  Create = async (req, res) => {
    new SuccessResponse({
      message: "Create success",
      metadata: await brandServices.Create(req.body),
    }).send(res);
  };
}

module.exports = new BrandController();
