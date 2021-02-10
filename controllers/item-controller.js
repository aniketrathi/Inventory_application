const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");

exports.item_list = function (req, res, next) {
  Item.find()
    .sort([["name", "ascending"]])
    .exec(function (err, results) {
      if (err) return next(err);

      res.render("item-list", {
        title: "All items",
        item_list: results,
      });
    });
};

exports.item_detail = function (req, res, next) {
  const { id } = req.params;
  Item.findById(id)
    .populate("category")
    .exec(function (err, results) {
      if (err) return next(err);
      res.render("item-detail", {
        title: "Item details",
        item: results,
      });
    });
};
