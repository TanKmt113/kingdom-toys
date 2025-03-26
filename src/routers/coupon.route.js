const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const couponController = require("../controllers/coupon.controller");
const { authentication } = require("../helpers/auth");

/**
 * @swagger
 *  tags:
 *      name: Coupon
 *      description: Coupon
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckingProduct:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: ID của sản phẩm
 *         quantity:
 *           type: number
 *           description: Số lượng đặt hàng
 *
 *     CheckingCoupon:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           description: Danh sách sản phẩm trong đơn hàng
 *           items:
 *             $ref: '#/components/schemas/CheckingProduct'
 *         coupon:
 *           type: string
 *           description: ID mã giảm giá (nếu có)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CouponDTO:
 *       type: object
 *       properties:
 *         CouponName:
 *           type: string
 *           description: "Tên của mã giảm giá"
 *         CouponType:
 *           type: string
 *           enum: [percent, fixed]
 *           description: "Loại mã giảm giá: phần trăm hoặc cố định"
 *         CouponValue:
 *           type: number
 *           description: "Giá trị giảm giá (số tiền hoặc %)"
 *         minOrderValue:
 *           type: number
 *           default: 0
 *           description: "Giá trị đơn hàng tối thiểu để áp dụng mã giảm giá"
 *         expiryDate:
 *           type: string
 *           format: date-time
 *           description: "Ngày hết hạn của mã giảm giá"
 *         usageLimit:
 *           type: number
 *           default: 1
 *           description: "Số lần mã giảm giá có thể sử dụng"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Coupon:
 *              type: object
 *              properties:
 *                  CouponName:
 *                      type: string
 */

/**
 * @swagger
 *  /coupon:
 *      get:
 *          summary: get Coupon
 *          tags: [Coupon]
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.get("/coupon", AsyncHandle(couponController.GetCoupon));

/**
 * @swagger
 *  /coupon:
 *      post:
 *          summary: Create coupon
 *          tags: [Coupon]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CouponDTO'
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/coupon", AsyncHandle(couponController.AddCoupon));

/**
 * @swagger
 *  /coupon/{id}:
 *      patch:
 *          summary: Update coupon
 *          tags: [Coupon]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CouponDTO'
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/coupon/:id", AsyncHandle(couponController.UpdateConpon));

/**
 * @swagger
 *  /coupon/{id}:
 *      delete:
 *          summary: delete coupon
 *          tags: [Coupon]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */

router.delete("/coupon/:id", AsyncHandle(couponController.DeleteCoupon));

/**
 * @swagger
 *  /coupon/apply:
 *      post:
 *          summary: Checkout with payload
 *          tags: [Coupon]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckingCoupon'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.post(
  "/coupon/apply",
  authentication,
  AsyncHandle(couponController.ApplyCoupon)
);

// /**
//  * @swagger
//  *  /coupon/checking:
//  *      get:
//  *          summary: Checking coupon
//  *          tags: [Coupon]
//  *          security:
//  *              - bearerAuth: []
//  *          responses:
//  *              200:
//  *                  description: success
//  */
// router.get(
//   "/coupon/checking",
//   authentication,
//   AsyncHandle(couponController.CheckingCoupon)
// );

module.exports = router;
