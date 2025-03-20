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
 *  components:
 *      schemas:
 *          CouponDTO:
 *              type: object
 *              properties:
 *                  CouponName:
 *                      type: string
 *                  CouponValue:
 *                      type: number
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

module.exports = router;
