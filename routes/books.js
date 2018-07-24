const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const mongoose = require("mongoose");

const asyncHandler = require('../utils/middleware');

/* GET books listing. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const books = await Book.find().populate("author");
    res.json(books);
  })
);

router.get("/:id", (req, res, next) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });

    await newBook.save();
    res.status(201).json({ message: `created a new book successfully` });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
  updatedBook === null
    ? next()
    : res.json({ message: `updated book with id ${req.params.id}` });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const bookToDelete = await Book.findByIdAndDelete(req.params.id);
    bookToDelete === null
    ? next()
    : res.json({ message: `delete book with id ${req.params.id}` });
  })
);

module.exports = router;
