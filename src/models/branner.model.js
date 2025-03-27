const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Branner";
const COLLECTION_NAME = "Branners";

const BrannerSchema = new Schema(
  {
    title: String,
    description: String,
    images: [String],
    button: String,
    discountText: String,
    link: String,
    type: {
        type: String,
        default: 'A',
    }
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, BrannerSchema);
