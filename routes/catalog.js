const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/category-controller");
const item_controller = require("../controllers/item-controller");

router.get("/", category_controller.index);

router.get("/categories", category_controller.category_list);

module.exports = router;
