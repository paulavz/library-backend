const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { documentModel: Document } = require("../models/documents");
const { model: Comment } = require("../models/comments");
const mongoose = require("mongoose");

const getDocuments = async (req, res = response) => {
  const limit = req.query.limit;
  const documents = await Document.find({}).sort({_id:-1}).limit(limit) ;
  console.log(documents);
  res.json(documents);
};

const postDocument = async (req, res = response) => {
  const {
    title,
    publisher,
    year,
    edition,
    authors,
    img,
    subject,
    category,
    type,
    gender,
    country,
    comments,
  } = req.body;

  const document = new Document({
    title,
    publisher,
    year,
    edition,
    authors,
    img,
    subject,
    category,
    type,
    gender,
    country,
    comments,
  });

  //Guardar en BD
  await document.save();

  res.json({
    msg: "post API- controlador",
    document,
  });
};

const getDocumentById = async (req, res = response) => {
  const id = req.params.id;

  const document = await Document.findById(id).exec();

  res.json(document);
};

const putDocument = async (req, res = response) => {
  const id = req.params.id;
  Document.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) {
        res.json({ error: err });
      }
      res.json(doc);
    }
  );
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete API- controlador",
  });
};

module.exports = {
  getDocuments,
  postDocument,
  getDocumentById,
  putDocument,
};
