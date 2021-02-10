const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/category-controller");
const item_controller = require("../controllers/item-controller");

const category_validator = require("../validators/category-validator");
const item_validator = require("../validators/item-validator");

// CATEGORY ROUTE //
router.get("/", category_controller.index);

router.get("/categories", category_controller.category_list);

router.get("/category/create", category_controller.category_create_get);

router.post(
  "/category/create",
  category_validator.generateValidator,
  category_controller.category_create_post
);

router.get("/category/:id", category_controller.category_detail);

// ITEM ROUTE //
router.get("/items", item_controller.item_list);

router.get("/item/create", item_controller.item_create_get);

router.post(
  "/item/create",
  item_validator.generateValidator,
  item_controller.item_create_post
);

router.get("/item/:id", item_controller.item_detail);

module.exports = router;
