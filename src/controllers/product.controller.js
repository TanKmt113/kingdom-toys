const productService = require("../services/product.service");
const { SuccessResponse } = require("../response/success.response");
const { convertURL } = require("../utils");

class ProductController {
  GetAll = async (req, res) => {
    const { skip, limit, filter, search } = req.query;
    new SuccessResponse({
      message: "Get all success",
      metadata: await productService.GetAll(skip, limit, filter, search),
    }).send(res);
  };
  GetById = async (req, res) => {
    const id = req.params.id;
    new SuccessResponse({
      message: "Get by id success",
      metadata: await productService.GetById(id),
    }).send(res);
  };

  Create = async (req, res) => {
    const { images } = req.files;
    const items = JSON.parse(req.body.items);
    if (images) items.images = convertURL(images);

    new SuccessResponse({
      message: "create success",
      metadata: await productService.Create(items),
    }).send(res);
  };

  Update = async (req, res) => {
    const id = req.params.id;
    const { images } = req.files;
    const items = JSON.parse(req.body.items);
    console.log(images);
    if (images) {
      items.images = convertURL(images);
    }

    new SuccessResponse({
      metadata: await productService.Update(id, items),
    }).send(res);
  };

  Delete = async (req, res) => {
    const id = req.params.id;
    new SuccessResponse({
      metadata: await productService.Delete(id),
    }).send(res);
  };
}

module.exports = new ProductController();
