const orderController = require("../controllers/order.controller");
const router = require("express").Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const { authentication } = require("../helpers/auth");

/**
 * @swagger
 *  tags:
 *      name: Order
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Order:
 *              type: object
 *              properties:
 *                  coupon:
 *                      type: string
 *                      description: id of coupon
 *                  fullName:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  addressLine:
 *                      type: string
 *                  ward:
 *                      type: string
 *                  district:
 *                      type: string
 *                  province:
 *                      type: string
 *                  paymentMethod:
 *                      type: string
 *                      description: cod, zalo
 *                      default: "cod"
 *                  notes:
 *                      type: string
 *
 */

/**
 * @swagger
 *  /order/checkout:
 *      post:
 *          summary: Checkout
 *          tags: [Order]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.post(
  "/order/checkout",
  authentication,
  AsyncHandle(orderController.Checkout)
);

/**
 * @swagger
 * /order:
 *  get:
 *    summary: Get order
 *    tags: [Order]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: success
 */
router.get("/order", authentication, AsyncHandle(orderController.GetOrder));

module.exports = router;
