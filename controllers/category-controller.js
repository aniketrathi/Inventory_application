const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");

exports.index = function (req, res) {
  async.parallel(
    {
      category_count: function (callback) {
        Category.countDocuments({}, callback);
      },
      item_count: function (callback) {
        Item.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Home",
        error: err,
        data: results,
      });
    }
  );
};

exports.category_list = function (req, res) {
  Category.find()
    .sort([["name", "ascending"]])
    .exec(function (err, results) {
      if (err) return next(err);

      res.render("category-list", {
        title: "All categories",
        category_list: results,
      });
    });
};
exports.category_detail = function (req, res) {
  const { id } = req.params;
  async.parallel(
    {
      category: function (callback) {
        Category.findById(id).exec(callback);
      },
      category_items: function (callback) {
        Item.findById({ category: id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);

      if (results.category == null) {
        // No results.
        const err = new Error("Author not found");
        err.status = 404;
        return next(err);
      }
      res.render("category-detail", {
        title: "Category Detail",
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};
