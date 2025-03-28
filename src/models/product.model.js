const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      default: "",
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
    descriptions: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      default: [],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: { type: Number, default: 0 },
    discount: {
      type: Number,
      default: 0,
    },
    madeIn: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
    sex: {
      type: String,
      enum: ["M", "F", "O"],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, ProductSchema);
