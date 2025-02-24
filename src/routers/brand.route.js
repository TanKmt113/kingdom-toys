const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");

/**
 * @swagger
 *  tags:
 *      name: Brand
 *      description: Brand management
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          BrandModel:
 *              type: object
 *              properties:
 *                  brandName:
 *                      type: string
 *                      default: "brand name"
 *                  brandDescription:
 *                      type: string
 *                      default: "brand description"
 */

/**
 * @swagger
 *  /brands:
 *      get:
 *          summary: Get all success
 *          tags: [Brand]
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *              - $ref: '#/components/parameters/Search'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.get("/brands", AsyncHandle(brandController.GetAll));

/**
 * @swagger
 *  /brand/{id}:
 *      get:
 *          summary: Get by id
 *          tags: [Brand]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.get("/brand/:id", AsyncHandle(brandController.GetById));

/**
 * @swagger
 *  /brand:
 *      post:
 *          summary: Create brand
 *          tags: [Brand]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BrandModel'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.post("/brand", AsyncHandle(brandController.Create));

/**
 * @swagger
 *  /brand/{id}:
 *      patch:
 *          summary: Update brand
 *          tags: [Brand]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BrandModel'
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/brand/:id", AsyncHandle(brandController.Update));

/**
 * @swagger
 *  /brand/{id}:
 *      delete:
 *          summary: Delete brand
 *          tags: [Brand]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/brand/:id", AsyncHandle(brandController.Delete));

module.exports = router;
