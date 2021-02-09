const express = require("express");
const { route } = require(".");
const router = express.Router();

const category_controller = require("../controllers/category-controller");
const item_controller = require("../controllers/item-controller");

// CATEGORY ROUTE //
router.get("/", category_controller.index);

router.get("/categories", category_controller.category_list);

router.get("/category/:id", category_controller.category_detail);

// ITEM ROUTE //
router.get("/items", item_controller.item_list);

module.exports = router;
