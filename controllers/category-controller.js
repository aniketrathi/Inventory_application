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

exports.category_detail = function (req, res, next) {
  const { id } = req.params;
  async.parallel(
    {
      category: function (callback) {
        Category.findById(id).exec(callback);
      },
      category_items: function (callback) {
        Item.find({ category: id }, "title").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.category == null) {
        // No results.
        const err = new Error("Category not found");
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

exports.category_create_get = function (req, res, next) {
  res.render("category-form", { title: "Create category" });
};

exports.category_create_post = function (req, res, next) {
  const { name, description } = req.body;

  const category = new Category({
    name: name,
    description: description,
  });
  category.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(category.url);
  });
};
