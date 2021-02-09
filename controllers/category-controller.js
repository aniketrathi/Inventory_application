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

