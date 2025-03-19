const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const cartController = require("../controllers/cart.controller");
const { authentication } = require("../helpers/auth");

/**
 * @swagger
 *  tags:
 *      name: Cart
 *      description: Day la gio hang ne
 */

/**
 * @swagger
 *  /cart:
 *      get:
 *          summary: "Get me"
 *          tags: [Cart]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: succeess
 *
 */
router.get("/cart", authentication, AsyncHandle(cartController.GetMe));
module.exports = router;
