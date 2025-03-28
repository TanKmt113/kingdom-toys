const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Nation";
const COLLECTION_NAME = "Nations";

const NationSchema = new Schema(
  {
    name: { type: String },
    niceName: { type: String },
    iso: { type: String },
    iso3: { type: String },
    numCode: { type: String },
    phoneCode: { type: String },
    flag: { type: String },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, NationSchema);
