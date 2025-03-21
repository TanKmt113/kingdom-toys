const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Province";
const COLLECTION_NAME = "Provinces";

const ProvinceSchema = new Schema(
  {
    Type: String,
    Code: String,
    Name: String,
    NameEn: String,
    FullName: String,
    FullNameEn: String,
    CodeName: String,
    AdministrativeRegionId: Number,
    AdministrativeRegionName: String,
    AdministrativeRegionNameEn: String,
    AdministrativeUnitId: Number,
    AdministrativeUnitShortName: String,
    AdministrativeUnitFullName: String,
    AdministrativeUnitShortNameEn: String,
    AdministrativeUnitFullNameEn: String,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, ProvinceSchema);
