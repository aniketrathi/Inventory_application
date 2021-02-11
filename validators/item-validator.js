const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.generateValidator = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("category", "Select a category").isLength({ min: 1 }),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Only decimals allowed")
    .trim()
    .optional({ checkFalsy: true })
    .isNumeric(),
  body("number_in_stock", "Only decimals allowed")
    .trim()
    .optional({ checkFalsy: true })
    .isNumeric(),
];
