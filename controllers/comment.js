const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { model: Comment } = require("../models/comments");
const { documentModel: Document } = require("../models/documents");

const getComment = async (req, res = response) => {
  const comment = await Comment.find({});
  res.json(users);
};

const addComment = async (req, res = response) => {
  const { userId, documentId, comment, punctuation } = req.body;
  const document = await Document.findById(documentId).exec();

  const newComment = new Comment({
    userId,
    documentId,
    comment,
    punctuation,
  });

  await newComment.save(function (err, commentInfo) {
    const { comments } = document;
    console.log(comments);
    const newComments = comments.concat([commentInfo]);
    console.log(newComments);
    Document.findOneAndUpdate(
      { _id: documentId },
      {
        $set: {
          comments: newComments,
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ error: err });
        }

        res.json(doc);
      }
    );
  });
};

module.exports = {
  addComment,
};
