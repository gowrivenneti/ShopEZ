const Product = require("../model/productModel");
const cloudinary = require("cloudinary");

// ======================
// Create Product (Admin)
// ======================
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, quantity } = req.body;

    let images = [];

    if (typeof req.body.image === "string") {
      images = [req.body.image];
    } else if (Array.isArray(req.body.image)) {
      images = req.body.image;
    }

    const imagesLink = [];

    for (let img of images) {
      if (!img.startsWith("data:image")) continue;

      const result = await cloudinary.v2.uploader.upload(img, {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      quantity,
      images: imagesLink,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Update Product (Admin)
// ======================
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const { name, description, category, brand, price, quantity, rating } =
      req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.ratings = rating || product.ratings;

    let images = [];

    if (req.body.image) {
      if (typeof req.body.image === "string") images = [req.body.image];
      else if (Array.isArray(req.body.image)) images = req.body.image;
    }

    if (images.length > 0 && images[0].startsWith("data:image")) {
      for (let img of product.images) {
        await cloudinary.v2.uploader.destroy(img.public_id);
      }

      const imagesLink = [];

      for (let img of images) {
        const result = await cloudinary.v2.uploader.upload(img, {
          folder: "products",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      product.images = imagesLink;
    }

    await product.save();

    res.status(200).json({
      success: true,
      isUpdated: true,
      product,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Delete Product
// ======================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      success: true,
      isDeleted: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Get Single Product
// ======================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Get Products (USER)
// ======================
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;

    const totalProducts = await Product.countDocuments();

    const results = await Product.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.status(200).json({
      results,
      limit: Number(limit),
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
      totalResults: totalProducts,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Admin Get All Products
// ======================
exports.getAllProductes = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Search Products
// ======================
exports.searchProduct = async (req, res) => {
  try {
    const keyword = req.params.query;

    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Reviews (Dummy safe)
// ======================
exports.createOrUpdateReview = async (req, res) => {
  res.status(200).json({ message: "Review feature coming soon" });
};

exports.getAllReviews = async (req, res) => {
  res.status(200).json([]);
};

exports.deleteReview = async (req, res) => {
  res.status(200).json({ message: "Review deleted" });
};
