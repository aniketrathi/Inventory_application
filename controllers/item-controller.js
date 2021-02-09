const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");

exports.item_list = function (req, res) {
  Item.find()
    .sort([["name", "ascending"]])
    .exec(function (err, results) {
      if (err) return async.nextTick(err);

      res.render("item-list", {
        title: "All items",
        item_list: results,
      });
    });
};
