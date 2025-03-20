const { Schema, model } = require("mongoose");
const { DISCOUNTTYPE } = require("../utils/enum");

const DOCUMENT_NAME = "Coupon";
const COLLECTION_NAME = "Coupons";

const Coupons = new Schema(
  {
    CouponName: {
      type: String,
      required: true,
    },
    CouponType: {
      type: String,
      enum: [DISCOUNTTYPE.PERCENT, DISCOUNTTYPE.FIXED],
      required: true,
    },
    CouponValue: {
      type: Number,
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },
    expiryDate: { type: Date, required: true }, // Ngày hết hạn
    usageLimit: { type: Number, default: 1 }, // Giới hạn số lần sử dụng
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, Coupons);
