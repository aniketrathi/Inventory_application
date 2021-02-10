const { body, validationResult } = require("express-validator");

exports.generateValidator = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("category-form", {
        title: "Create category",
        category: req.body,
        errors: errors.array(),
      });
      return;
    }
    next();
  },
];
