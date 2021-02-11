const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.generateValidator = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Category.find({}).exec(function (err, results) {
        if (err) return next(err);

        res.render("item-form", {
          title: "Create item",
          item: req.body,
          categories: results,
          errors: errors.array(),
        });
      });
      return;
    }
    next();
  },
];
