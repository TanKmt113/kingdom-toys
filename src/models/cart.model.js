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
});

const CartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number, 
      default: 0
    }
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, CartSchema);
