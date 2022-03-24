const productDao = require("../models/productDao");

const getCategories = async () => {
  try {
    return await productDao.getCategories();
  } catch (err) {
    console.log(err);
  }
};
const getProducts = async () => {
  try {
    return await productDao.getProducts();
  } catch (err) {
    console.log(err);
  }
};

const getProductDetail = async (id) => {
  try {
    const product = await productDao.getProductDetail(id);

    if (product.length === 0) {
      const error = new Error("PRODUCT_NOT_FOUND");
      error.statusCode = 404;
      throw error;
    }

    return product;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProducts, getProductDetail, getCategories };
