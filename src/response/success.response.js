const { ReasonPhrases, StatusCodes } = require("./httpStatusCode");

class Pagination {
  constructor({ result = [], page = 1, limit = 30, total = 0 }) {
    this.result = result;
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
  }
}

class SuccessResponse {
  constructor({
    message = "success",
    reasonStatus = ReasonPhrases.OK,
    statusCode = StatusCodes.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatus : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

module.exports = { SuccessResponse, Pagination };
