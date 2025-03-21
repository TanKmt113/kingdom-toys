const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Ward";
const COLLECTION_NAME = "Wards";

const WardSchema = new Schema(
  {
    Type: String,
    Code: String,
    Name: String,
    NameEn: String,
    FullName: String,
    FullNameEn: String,
    CodeName: String,
    DistrictCode: String, // để liên kết với District
    AdministrativeUnitId: Number,
    AdministrativeUnitShortName: String,
    AdministrativeUnitFullName: String,
    AdministrativeUnitShortNameEn: String,
    AdministrativeUnitFullNameEn: String,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, WardSchema);
