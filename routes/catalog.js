const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/category-controller");
const item_controller = require("../controllers/item-controller");

/* GET users listing. */
router.get("/", category_controller.index);

module.exports = router;
