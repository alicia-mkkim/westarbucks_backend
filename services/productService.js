const productDao = require("../models/productDao");

const getProducts = async () => {
  try {
    return await productDao.getProducts();
  } catch (err) {
    console.log(err);
  }
};

const getCategories = async () => {
  try {
    return await productDao.getCategories();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProducts, getCategories };
