const router = require("express").Router();

const AddressContrller = require("../controllers/address.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");

/**
 * @swagger
 *  tags:
 *      name: Address
 */

/**
 * @swagger
 *  /province:
 *      get:
 *          tags: [Address]
 *          summary: data synchronization
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *              - $ref: '#/components/parameters/Search'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/province", AsyncHandle(AddressContrller.GetProvince));

/**
 * @swagger
 *  /province/district/{id}:
 *      get:
 *          tags: [Address]
 *          summary: data district
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/province/district/:id", AsyncHandle(AddressContrller.GetDistrict));

/**
 * @swagger
 *  /province/ward/{id}:
 *      get:
 *          tags: [Address]
 *          summary: data ward
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/province/ward/:id", AsyncHandle(AddressContrller.GetWard));

module.exports = router;
