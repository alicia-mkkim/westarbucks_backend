const proudctService = require("../services/productService");
const jwt = require("jsonwebtoken");

const getCategories = async (req, res) => {
  try {
    if (req.headers.token === undefined) {
      const error = new Error("LOGIN_REQUIRED");
      error.statusCode = 401;
      throw error;
    }

    const token = req.headers.token;
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const categories = await proudctService.getCategories();
    return res
      .status(200)
      .json({ message: `안녕하세요,  ${id}님`, categories });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const getProducts = await proudctService.getProducts();
    return res.status(200).json({ getProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const getProductDetail = await proudctService.getProductDetail(id);
    return res.status(200).json({ getProductDetail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.mesgae });
  }
};

module.exports = { getProducts, getProductDetail, getCategories };
