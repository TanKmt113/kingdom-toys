const genreService = require("../services/genre.service");
const { SuccessResponse } = require("../response/success.response");

class GenreController {
  GetAll = async (req, res, next) => {
    new SuccessResponse({
      message: "get all genre",
      metadata: await genreService.GetAll(),
    }).send(res);
  };

  GetById = async (req, res, next) => {

    const { slug } = req.params;
    
    new SuccessResponse({
      message: "Get by id",
      metadata: await genreService.GetById(slug),
    }).send(res);
  };

  Create = async (req, res, next) => {

    new SuccessResponse({
      message: "create by id",
      metadata: await genreService.Create(req.body),
    }).send(res);
  };

  Update = async (req, res, next) => {
    const { slug } = req.params;
    new SuccessResponse({
      message: "update by id",
      metadata: await genreService.Update(slug, req.body),
    }).send(res);
  };

  Delete = async (req, res, next) => {
    const { slug } = req.params;
    new SuccessResponse({
      message: "delete by id",
      metadata: await genreService.Delete(slug),
    }).send(res);
  };
}

module.exports = new GenreController();
