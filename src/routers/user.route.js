const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const userController = require("../controllers/user.controller");
const { authentication } = require("../helpers/auth");

/**
 * @swagger
 *  tags:
 *      name: Account
 *      description: Account management
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          RegisterModel:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      description: gmail of user
 *                      default: "vuhoang250203@gmail.com"
 *                  password:
 *                      type: string
 *                      description: password of account
 *                      default: "123"
 */

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Login
 *      tags: [Account]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterModel'
 *      responses:
 *          200:
 *              description: login success!
 */
router.post("/login", AsyncHandle(userController.Login));

/**
 * @swagger
 *  /register:
 *      post:
 *          summary: Register a new user
 *          tags: [Account]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  default: "client@gmail.com"
 *                              email:
 *                                  type: string
 *                                  default: "client@gmail.com"
 *                              password:
 *                                  type: string
 *                                  default: "123"
 *          responses:
 *              200:
 *                  description: Register successful
 *              400:
 *                  description: Invalid input
 */
router.post("/register", AsyncHandle(userController.Register));

/**
 * @swagger
 *  /handleRF:
 *      post:
 *          summary: Refresh token
 *          tags: [Account]
 *          parameters:
 *              - $ref: '#/components/parameters/RefreshToken'
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description: Unauthorized (token invalid or missing)
 */
router.post("/handleRF", authentication, AsyncHandle(userController.HandleRF));

/**
 * @swagger
 *  /get-me:
 *      get:
 *          summary: Get me
 *          tags: [Account]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: Can not get info
 */
router.get("/get-me", authentication, AsyncHandle(userController.GetMe));

module.exports = router;
