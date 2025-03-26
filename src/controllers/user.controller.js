const { SuccessResponse } = require("../response/success.response");
const userService = require("../services/user.service");
const { convertURL } = require("../utils/index");

class UserController {
  Login = async (req, res) => {
    new SuccessResponse({
      message: "login success",
      metadata: await userService.Login(req.body),
    }).send(res);
  };

  Register = async (req, res) => {
    new SuccessResponse({
      message: "register success",
      metadata: await userService.Register(req.body),
    }).send(res);
  };

  HandleRF = async (req, res) => {
    new SuccessResponse({
      message: "handle rf success",
      metadata: await userService.HandleRefreshToken(
        req.user,
        req.refreshToken
      ),
    }).send(res);
  };

  GetMe = async (req, res) => {
    new SuccessResponse({
      message: "get me success",
      metadata: await userService.GetMe(req.user),
    }).send(res);
  };

  Update = async (req, res) => {
    const { images } = req.files;
    let items = JSON.parse(req.body.items);
    console.log(images)
    if (images) {
      items.images = convertURL(images);
    }

    console.log(items)
    console.log(images);
    new SuccessResponse({
      message: "update success",
      metadata: 1,
    }).send(res);
  };
}

module.exports = new UserController();
