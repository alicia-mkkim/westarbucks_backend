const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (email, password) => {
  if (password.length < 8) {
    const error = new Error("PASSWORD_TOO_SHORT");
    error.statusCode = 400;
    throw error;
  }

  const user = await userDao.getUserByEmail(email);

  if (user.length !== 0) {
    const error = new Error("EXSITING_USER");
    error.statusCode = 400;
    throw error;
  }

  const salt = bcrypt.genSaltSync();
  const encryptedPassword = bcrypt.hashSync(password, salt);

  const newUser = await userDao.createUser(email, encryptedPassword);
  return newUser;
};

const login = async (email, password) => {
  const user = await userDao.checkUser(email, password);

  if (user.length === 0) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;
    throw error;
  }

  const isCorrect = bcrypt.compareSync(password, user[0].password);
  try {
    if (!isCorrect) {
      const error = new Error("INVALID_USER");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signUp, login };
