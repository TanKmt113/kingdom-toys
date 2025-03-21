const express = require("express");
const router = express.Router();
const fs = require("fs");
const provinceModel = require("../models/province.model");
const districtModel = require("../models/district.model");
const wardModel = require("../models/ward.model");

/**
 * @swagger
 *  /async:
 *      post:
 *          tags: [Sync data]
 *          summary: data synchronization
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/async", async (req, res, next) => {
  try {
    const rawData = JSON.parse(
      fs.readFileSync("full_json_generated_data_vn_units.json", "utf8")
    );

    let provinces = [];
    let districts = [];
    let wards = [];

    rawData.forEach((province) => {
      const { District: districtList = [], ...provinceInfo } = province;
      provinces.push(provinceInfo);

      districtList.forEach((district) => {
        const { Ward, ...districtInfo } = district;
        districts.push(districtInfo);

        const wardList = Array.isArray(Ward) ? Ward : Ward ? [Ward] : [];

        wards.push(...wardList);
      });
    });

    await provinceModel.insertMany(provinces);
    await districtModel.insertMany(districts);
    await wardModel.insertMany(wards);

    res.json({
      message: "✅ Tách dữ liệu thành công!",
      total: {
        provinces: provinces.length,
        districts: districts.length,
        wards: wards.length,
      },
    });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý dữ liệu:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi xử lý dữ liệu", error: error.message });
  }
});

module.exports = router;
