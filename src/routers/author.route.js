const router = require("express").Router();
const { uploadDisk } = require("../configs/multer.config");
const authorController = require("../controllers/author.controller");

const { AsyncHandle } = require("../helpers/AsyncHandle");

/**
 * @swagger
 *  tags:
 *      name: Author
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AuthorModel:
 *              type: object
 *              properties:
 *                  items:
 *                      type: string
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *
 */

/**
 * @swagger
 *  /author:
 *      get:
 *          tags: [Author]
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *              - $ref: '#/components/parameters/Search'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/author", AsyncHandle(authorController.GetAll));

/**
 * @swagger
 *  /author/{id}:
 *      get:
 *          tags: [Author]
 *          parameters:
 *              -  $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/author/:id", AsyncHandle(authorController.GetById));

/**
 * @swagger
 *  /author:
 *      post:
 *          tags: [Author]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          - $ref: '#/components/schemas/AuthorModel'
 *          responses:
 *              200:
 *                  description: success
 */
router.post(
  "/author",
  uploadDisk.fields([{ name: "images", maxCount: 10 }]),
  AsyncHandle(authorController.Create)
);

/**
 * @swagger
 *  /author/{id}:
 *      patch:
 *          tags: [Author]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          - $ref: '#/components/schemas/AuthorModel'
 *          responses:
 *              200:
 *                  description: success
 */
router.patch(
  "/author/:id",
  uploadDisk.fields([{ name: "images", maxCount: 10 }]),
  AsyncHandle(authorController.Update)
);

/**
 * @swagger
 *  /author/{id}:
 *      delete:
 *          tags: [Author]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */

router.delete("/author/:id", AsyncHandle(authorController.Delete));

module.exports = router;
