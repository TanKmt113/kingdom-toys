const router = require("express").Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const dashboardController = require("../controllers/dashboard.controller");

/**
 * @swagger
 *  tags:
 *      name: Dashboard
 */

/**
 * @swagger
 *  /dashboard:
 *      get:
 *          summary: Get dashboard
 *          tags: [Dashboard]
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/dashboard", AsyncHandle(dashboardController.GetDashBoard));

module.exports = router;
