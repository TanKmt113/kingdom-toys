const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Author";
const COLLECTION_NAME = "Authors";

const AuthorSchema = new Schema(
  {
    authorName: {
      type: String,
    },
    authorDescription: {
      type: String,
    },
    images: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, AuthorSchema);
