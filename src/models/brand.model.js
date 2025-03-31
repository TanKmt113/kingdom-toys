const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Brand";
const COLLECTION_NAME = "Brands";

const BrandSchema = new Schema(
  {
    brandName: {
      type: String,
      default: "",
    },
    brandDescription: {
      type: String,
      default: "",
    },
    iamgeLink: String,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, BrandSchema);
