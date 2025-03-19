const express = require("express");

const router = express.Router();

router.use("/", require("./user.route"));
router.use("/", require("./genre.route"));
router.use("/", require("./product.route"));
router.use('/', require('./cart.route'))

module.exports = router;
