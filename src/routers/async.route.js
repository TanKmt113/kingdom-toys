const express = require("express");
const router = express.Router();
const fs = require("fs");
const provinceModel = require("../models/province.model");
const mongoose = require("mongoose");
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

    const provinceCount = await provinceModel.countDocuments();
    const districtCount = await districtModel.countDocuments();
    const wardCount = await wardModel.countDocuments();
    if (provinceCount == 0) await provinceModel.insertMany(provinces);
    if (districtCount == 0) await districtModel.insertMany(districts);
    if (wardCount == 0) await wardModel.insertMany(wards);

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

/**
 * @swagger
 *  /export-data:
 *      post:
 *          tags: [Sync data]
 *          summary: data synchronization
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/export-data", async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const data = {};

    // Lấy dữ liệu từ từng collection và lưu vào đối tượng
    for (let collection of collections) {
      const collectionName = collection.name;
      const collectionData = await mongoose.connection
        .collection(collectionName)
        .find()
        .toArray();
      data[collectionName] = collectionData;
    }

    const filePath = "./data.json"; // Đường dẫn file nơi bạn muốn lưu dữ liệu
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Ghi dữ liệu dưới dạng JSON

    res.send(`Data exported successfully to ${filePath}`);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
/**
 * @swagger
 *  /import-data:
 *      post:
 *          tags: [Sync data]
 *          summary: data synchronization
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/import-data", async (req, res) => {
  try {
    // Đọc dữ liệu từ tệp JSON
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf8"));

    // Lặp qua từng collection trong rawData
    for (const collectionName in rawData) {
      if (rawData.hasOwnProperty(collectionName)) {
        const collectionData = rawData[collectionName];

        // Kiểm tra nếu collectionData không phải là mảng hoặc là mảng rỗng
        if (Array.isArray(collectionData) && collectionData.length > 0) {
          // Chèn dữ liệu vào collection trong MongoDB
          const collection = mongoose.connection.collection(collectionName);
          await collection.insertMany(collectionData);
          console.log(`Imported data to ${collectionName}`);
        } else {
          console.log(`No data to import for collection: ${collectionName}`);
        }
      }
    }

    res.send("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
    res.status(500).send("Error importing data");
  }
});
module.exports = router;
