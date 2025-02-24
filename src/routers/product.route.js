const router = require("express").Router();
const productController = require("../controllers/product.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");

/**
 * @swagger
 *  tags:
 *      name: Product
 *      desscription: Product management
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  images:
 *                      type: Array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  items:
 *                      type: string
 *                      description:
 *                          data of product
 *                          default:
 *
 */

/**
 * @swagger
 *  /products:
 *      get:
 *          tags: [Product]
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *              - $ref: '#/components/parameters/Search'
 *          responses:
 *              200:
 *                  description: success
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
 *                  description: success
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
 *                          $ref: '#/components/schema/Product'
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/product", AsyncHandle(productController.Create));

/**
 * @swagger
 *  /product/{id}:
 *      patch:
 *          tags: [Product]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          requestBody:
 *              required: true
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schema/Product'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.patch("/product/:id", AsyncHandle(productController.Update));

/**
 * @swagger
 *  /product/{id}:
 *      delete:
 *          tags: [Product]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/product/:id", AsyncHandle(productController.Delete));
