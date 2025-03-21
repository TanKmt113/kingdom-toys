const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "District";
const COLLECTION_NAME = "Districts";

const DistrictSchema = new Schema(
  {
    Type: String,
    Code: String,
    Name: String,
    NameEn: String,
    FullName: String,
    FullNameEn: String,
    CodeName: String,
    ProvinceCode: String, // để liên kết với Province
    AdministrativeUnitId: Number,
    AdministrativeUnitShortName: String,
    AdministrativeUnitFullName: String,
    AdministrativeUnitShortNameEn: String,
    AdministrativeUnitFullNameEn: String,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, DistrictSchema);
