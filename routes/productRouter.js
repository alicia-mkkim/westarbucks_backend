const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validateToken");
const productController = require("../controllers/productController");

router.get(
  "/categories",
  validate.validateToken,
  productController.getCategories
);
router.get("", productController.getProducts);
router.get("/:id", productController.getProductDetail);

module.exports = router;
