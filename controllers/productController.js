const proudctService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const getProducts = await proudctService.getProducts();
    return res.status(200).json({ getProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const getCategories = await proudctService.getCategories();
    return res.status(200).json({ getCategories });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, getCategories };
