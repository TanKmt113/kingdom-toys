const router = require("express").Router();
const { uploadDisk } = require("../configs/multer.config");
const productController = require("../controllers/product.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");
const { authentication } = require("../helpers/auth");

/**
 * @swagger
 *  tags:
 *      name: Product
 *      description: Product management
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  items:
 *                      type: string
 *                      description: Name of the product
 *                      default: ""
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: List of product images
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CommentModel:
 *        type: object
 *        properties:
 *          content:
 *            type: string
 *          rating:
 *            type: number
 *
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Product]
 *     summary: Lấy danh sách sản phẩm có filter
 *     parameters:
 *       - $ref: '#/components/parameters/Skip'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/filter'
 *       - $ref: '#/components/parameters/Search'
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           example: 100000:300000,500000:1000000
 *         description: Khoảng giá, cách nhau bằng dấu phẩy. Dạng `min:max`
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *           example: 6603f2bc0b867fce2d4fa5b2,6603f2bc0b867fce2d4fa5b3
 *         description: Danh sách ID thể loại (genre), cách nhau bằng dấu phẩy
 *       - in: query
 *         name: sex
 *         schema:
 *           type: string
 *           example: M,F
 *       - in: query
 *         name: age
 *         schema:
 *           type: string
 *           example: 3:5,6:8
 *         description: Khoảng tuổi (dạng `min:max`), nhiều khoảng cách nhau bởi dấu phẩy
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 */
router.get("/products", AsyncHandle(productController.GetAll));

/**
 * @swagger
 *  /product/{id}:
 *      get:
 *          tags: [Product]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: Get a single product by ID
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 */
router.get("/product/:id", AsyncHandle(productController.GetById));

/**
 * @swagger
 *  /product:
 *      post:
 *          tags: [Product]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: Product created successfully
 */
router.post(
  "/product",
  uploadDisk.fields([{ name: "images", maxCount: 10 }]),
  AsyncHandle(productController.Create)
);

/**
 * @swagger
 *  /product/{id}:
 *      patch:
 *          tags: [Product]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              200:
 *                  description: Product updated successfully
 */
router.patch(
  "/product/:id",

  uploadDisk.fields([{ name: "images", maxCount: 10 }]),

  AsyncHandle(productController.Update)
);

/**
 * @swagger
 *  /product/{id}:
 *      delete:
 *          tags: [Product]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: Product deleted successfully
 */
router.delete("/product/:id", AsyncHandle(productController.Delete));

/**
 * @swagger
 *  /product/{id}/comment:
 *    post:
 *      tags: [Product]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/Id'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentModel'
 *      responses:
 *        200:
 *          description: success
 */
router.post(
  "/product/:id/comment",
  authentication,
  AsyncHandle(productController.AddComment)
);

/**
 * @swagger
 *  /product/{id}/comment/{commentId}:
 *    delete:
 *      tags: [Product]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/Id'
 *        - $ref: '#/components/parameters/CommentId'
 *      responses:
 *        200:
 *          description: Successfully removed comment from the product
 *        400:
 *          description: Bad request (comment not found or unauthorized)
 *        404:
 *          description: Product not found
 */
router.delete(
  "/product/:id/comment/:commentId",
  authentication,
  AsyncHandle(productController.RemoveComment)
);

module.exports = router;
