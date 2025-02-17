const keyTokenModel = require("../models/keysToken.model");
const { BadRequestError } = require("../response/error.response");

class KeyTokenService {
  createKeys = async ({ user, refreshToken }) => {
    const keys = await keyTokenModel.findOneAndUpdate(
      {
        user: user._id,
      },
      { refreshToken: refreshToken },
      { new: true, upsert: true }
    );

    if (!keys) throw new BadRequestError("can not create key store");

    return keys;
  };

  findKeyTokenByUserId = async (id) => {
    return await keyTokenModel.findOne({ user: id });
  };

  findKeyTokenByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken: refreshToken });
  };

  removeKeyTokenByUserId = async (id) => {
    return await keyTokenModel.deleteOne({
      user: id,
    });
  };
}

module.exports = new KeyTokenService();
