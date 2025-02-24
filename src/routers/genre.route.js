const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const genreController = require("../controllers/genre.controller");

/**
 * @swagger
 *  tags:
 *      name: Genre
 *      description: Genre management
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          genreModel:
 *              type: object
 *              properties:
 *                  genreName:
 *                      type: string
 *                      default: genre name
 *                  genreDescription:
 *                      type: string
 *                      default: genre description
 *
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          SlugParam:
 *              name: slug
 *              in: path
 *              required: true
 *              schema:
 *                  type: string
 *              description: The genre slug
 */
/**
 * @swagger
 *  /genres:
 *  get:
 *      summary: Get all genres
 *      tags: [Genre]
 *      responses:
 *          200:
 *              description: success
 *
 */
router.get("/genres", AsyncHandle(genreController.GetAll));

/**
 * @swagger
 * /genre/{slug}:
 *   get:
 *     summary: Get genre by slug
 *     tags: [Genre]
 *     parameters:
 *          - $ref: '#/components/parameters/SlugParam'
 *     responses:
 *       200:
 *         description: Genre found successfully
 *       404:
 *         description: Genre not found
 */
router.get("/genre/:slug", AsyncHandle(genreController.GetById));

/**
 * @swagger
 * /genre:
 *  post:
 *      summary: Create genre
 *      tags: [Genre]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/genreModel'
 *      responses:
 *          201:
 *              description: create success
 */
router.post("/genre", AsyncHandle(genreController.Create));

/**
 * @swagger
 * /genre/{id}:
 *  patch:
 *      summary: Update genre
 *      tags: [Genre]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/genreModel'
 *      responses:
 *          200:
 *              description: success
 */
router.patch("/genre/:slug", AsyncHandle(genreController.Update));

/**
 * @swagger
 * /genre/{id}:
 *  delete:
 *      summary: Delete genre
 *      tags: [Genre]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      responses:
 *          200:
 *              description: success
 */
router.delete("/genre/:slug", AsyncHandle(genreController.Delete));

module.exports = router;
