const { SuccessResponse } = require("../response/success.response");
const dashboardService = require("../services/dashboard.service");

class DashboardController {
  GetDashBoard = async (req, res) => {
    new SuccessResponse({
      message: "Get Dashboard",
      metadata: await dashboardService.GetDashboasd(),
    }).send(res);
  };
}

module.exports = new DashboardController();
