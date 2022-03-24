const express = require("express");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const { id } = jwt.verify(token, SECRET_KEY);

    const foundUser = await userService.foundUser({ id });
    if (!foundUser) {
      res.status(400).json({ statusCode: 404, message: "USER_NOT_FOUND" });
    }
    req.foundUser = foundUser;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { validateToken };
