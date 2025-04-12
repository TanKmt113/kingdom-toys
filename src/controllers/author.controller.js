const { SuccessResponse } = require("../response/success.response");
const authorService = require("../services/author.service");
const { convertURL } = require("../utils");

class AuthorController {
  Create = async (req, res) => {
    const { images } = req.files;
    const items = JSON.parse(req.body.items);
    if (images) items.images = convertURL(images)[0];
    new SuccessResponse({
      message: "Tạo tác giả thành công",
      metadata: await authorService.CreateAuthor(items),
    }).send(res);
  };

  GetAll = async (req, res) => {
    const { skip, limit, search } = req.query;
    new SuccessResponse({
      message: "Get all success",
      metadata: await authorService.GetAll(skip, limit, search),
    }).send(res);
  };

  GetById = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "Get by id success",
      metadata: await authorService.GetDetail(id),
    }).send(res);
  };

  Delete = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "Get by id success",
      metadata: await authorService.Delete(id),
    }).send(res);
  };

  Update = async (req, res) => {
    const { id } = req.params;
    const { images } = req.files;
    const items = JSON.parse(req.body.items);
    if (images) items.images = convertURL(images);
    new SuccessResponse({
      message: "Cập nhật tác giả thành công",
      metadata: await authorService.EditAuthor(id, items),
    }).send(res);
  };
}

module.exports = new AuthorController();
