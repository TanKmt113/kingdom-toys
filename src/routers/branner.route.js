const router = require("express").Router();
const brannerController = require("../controllers/branner.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");

/**
 * @swagger
 *  tags:
 *    name: Branner
 *    description: Branner management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BrannerModel:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Khuyến mãi siêu hot"
 *         description:
 *           type: string
 *           example: "Giảm giá đến 50% toàn bộ sản phẩm"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         button:
 *           type: string
 *           example: "Mua ngay"
 *         text:
 *           type: string
 *           example: "Chi tiết khuyến mãi"
 *         link:
 *           type: string
 *           example: "https://example.com/khuyen-mai"
 */

/**
 * @swagger
 *  /branners:
 *      get:
 *          summary: get all branners
 *          tags: [Branner]
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/branners", AsyncHandle(brannerController.GetAll));

/**
 * @swagger
 *  /branner/{id}:
 *    post:
 *      summary: create new branner
 *      tags: [Branner]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/BrannerModel'
 *      responses:
 *        200:
 *         description: success
 */
router.post("/branner", AsyncHandle(brannerController.Create));

/**
 * @swagger
 *  /branner/{id}:
 *      patch:
 *          summary: update branner by id
 *          tags: [Branner]
 *          parameters:
 *             - $ref: '#/components/parameters/Id'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/BrannerModel'
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/branner/:id", AsyncHandle(brannerController.Update));

/**
 * @swagger
 *  /branner/{id}:
 *     delete:
 *          summary: delete branner by id
 *          tags: [Branner]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *             200:
 *               description: success
 *
 */
router.delete("/branner/:id", AsyncHandle(brannerController.Delete));
