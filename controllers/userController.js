const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("KEY ERROR");
      error.statusCode = 400;
      throw error;
    }

    const user = await userService.signUp(email, password);

    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
      user_Id: user[0].id,
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("KEY ERROR");
      error.statusCode = 400;
      throw error;
    }
    const token = await userService.login(email, password);
    return res.status(201).json({
      message: "SUCCESS_LOGIN",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { signUp, login };
