const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Liên kết đến người dùng (User)
      required: true,
    },
    content: {
      type: String,
      required: true, // Bình luận bắt buộc có nội dung
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5, // Đánh giá bình luận từ 1-5 sao
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

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
    comments: [CommentSchema],
    price: {
      type: Number,
      default: 0,
    },
    quantity: { type: Number, default: 0 },
    discount: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
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
