const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

const setupSwagger = require("./configs/swagger");

app.use(cors());
app.use(morgan("dev"));
// app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./configs/mongoose.config");

// Swagger

setupSwagger(app);

// End swagger

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routers/index.route"));

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  const status = err.status || 501;
  return res.status(status).json({
    status: status,
    code: status,
    stack: err.stack,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
