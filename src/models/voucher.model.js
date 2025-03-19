const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Voucher";
const COLLECTION_NAME = "Vouchers";

const GenreSchema = new Schema(
  {
    voucherName: {
      type: String,
      required: true,
    },
    voucherType: {
      type: String,
      enum: ["P", "C"], // P: Percentage, C: Cash
      default: "P",
    },
    voucherValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, GenreSchema);
