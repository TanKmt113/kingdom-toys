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
 *  components:
 *      schemas:
 *          AddToCart:
 *              type: object
 *              properties:
 *                  productId:
 *                      type: string
 *                  quantity:
 *                      type: number
 *                      default: 0
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

/**
 * @swagger
 * /cart/addToCart:
 *   post:
 *     summary: "Thêm sản phẩm vào giỏ hàng"
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCart'
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Lỗi yêu cầu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập hoặc token không hợp lệ
 */
router.post(
  "/cart/addToCart",
  authentication,
  AsyncHandle(cartController.AddToCart)
);
module.exports = router;
