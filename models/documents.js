const { Schema, model } = require("mongoose");
const comments = require("./comments");

const documentSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio"],
    index: true,
  },
  publisher: {
    type: String,
  },
  year: {
    type: Number,
  },
  edition: {
    type: String,
  },
  authors: [
    {
      type: String,
      required: [true, "El autor es obligatorio"],
    },
  ],
  img: {
    type: String,
  },
  subject: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "El tipo es obligatorio"],
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
  },
  comments: [
    {
      type: comments.CommentSchema,
    },
  ],
  punctuation: {
    type: Number,
    default: 0,
  },
  file: {
    type: String,
  },
});

module.exports = {
  documentModel: model("Document", documentSchema), //Debe ir en singular
  documentSchema,
};
