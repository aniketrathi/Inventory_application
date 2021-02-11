const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");
const { validationResult } = require("express-validator");

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
        Item.find({ category: id }).exec(callback);
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("category-form", {
      title: "Create category",
      category: req.body,
      errors: errors.array(),
    });
    return;
  }

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

exports.category_delete_get = function (req, res) {
  const { id } = req.params;
  async.parallel(
    {
      category: function (callback) {
        Category.findById(id).exec(callback);
      },
      categories_items: function (callback) {
        Item.find({ category: id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results.
        res.redirect("/catalog/categories");
      }
      res.render("category-delete", {
        title: "Delete category",
        category: results.category,
        category_items: results.categories_items,
      });
    }
  );
};

exports.category_delete_post = function (req, res) {
  const { id } = req.params;
  Category.findByIdAndRemove(id).exec(function (err, results) {
    if (err) return next(err);
    res.redirect("/catalog/categories");
  });
};

exports.category_update_get = function (req, res) {
  const { id } = req.params;
  Category.findById(id).exec(function (err, results) {
    if (err) return next(err);
    res.render("category-form", {
      title: "Update form",
      category: results,
    });
  });
};

exports.category_update_post = function (req, res) {
  const { id } = req.params;
  Category.findByIdAndUpdate(id, req.body).exec(function (err, results) {
    if (err) return next(err);
    res.redirect(results.url);
  });
};
