const { Schema, model, Types, default: mongoose } = require("mongoose");

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

const CartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, CartSchema);
