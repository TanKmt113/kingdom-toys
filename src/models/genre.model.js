const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Genre";
const COLLECTION_NAME = "Genres";

const GenreSchema = new Schema(
  {
    genreName: {
      type: String,
      required: true,
    },
    genreDescription: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, GenreSchema);
