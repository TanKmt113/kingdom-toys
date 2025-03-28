const express = require("express");
const { AsyncHandle } = require("../helpers/AsyncHandle");
const NationController = require("../controllers/nation.controller");
const router = express.Router();

/**
 * @swagger
 *  tags:
 *      name: Nation
 *      description: Nation management
 */

/**
 * @swagger
 *  /nation-async:
 *      post:
 *          summary: Async nation
 *          tags :
 *              - Nation
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/nation-async", AsyncHandle(NationController.AsyncData));

/**
 * @swagger
 *  /nations:
 *      get:
 *          summary: Get all languages
 *          tags:
 *              - Nation
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/nations", AsyncHandle(NationController.GetAll));

/**
 * @swagger
 *  /nations/{id}:
 *      get:
 *          summary: Get by code
 *          tags:
 *              - Nation
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/nations/:id", AsyncHandle(NationController.GetByName));
module.exports = router;
