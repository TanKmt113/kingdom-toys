const { Schema, model, Types, default: mongoose } = require("mongoose");

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

const CartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    reqiured: true,
  },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
});

const CartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
    finalPrice: { type: Number, defautl: 0 },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);  

module.exports = model(DOCUMENT_NAME, CartSchema);
