const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProduct,
  getAllProductes,
  createOrUpdateReview,
  getAllReviews,
  deleteReview,
} = require("../controller/productController");

const { auth, authorizeRoles } = require("../middleware/auth");

// User routes
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductById);
router.route("/products/search/:query").get(searchProduct);

// Admin routes
router.route("/admin/product/new").post(auth, authorizeRoles("admin"), createProduct);
router.route("/admin/products").get(auth, authorizeRoles("admin"), getAllProductes);
router.route("/admin/products/:id")
  .put(auth, authorizeRoles("admin"), updateProduct)
  .delete(auth, authorizeRoles("admin"), deleteProduct);

// Reviews
router.route("/review").put(auth, createOrUpdateReview);
router.route("/review").get(getAllReviews);
router.route("/review").delete(auth, deleteReview);

module.exports = router;
