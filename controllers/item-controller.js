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

exports.item_create_get = function (req, res) {
  Category.find({}).exec(function (err, results) {
    if (err) return next(err);
    res.render("item-form", {
      title: "Create item",
      categories: results,
    });
  });
};

exports.item_create_post = function(req,res){
  const { name, description, category, price, number_in_stock } = req.body;

  const item = new Item({
    name: name,
    category: category,
    description: description,
    price: price,
    number_in_stock: number_in_stock,
  });
  item.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(item.url);
  });
}