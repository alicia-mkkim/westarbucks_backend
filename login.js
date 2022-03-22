const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // if (!email || !password) {
    //   const error = new Error("KEY_ERROR");
    //   error.statusCode = 400;
    //   throw error;
    // }

    const user = await prisma.$queryRaw`
        SELECT id , password FROM users where email=${email};
    `;

    if (user.length === 0) {
      const error = new Error("INVALID_USER");
      error.statusCode = 400;
      throw error;
    }

    const isCorrect = bcrypt.compareSync(password, user[0].password);
    // 패스워드가 맞지 않을때
    if (!isCorrect) {
      const err = new Error("INVALID_USER");
      err.statusCode = 400;
      throw err;
    }

    //토큰 발행

    const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY);
    return res.status(200).json({ message: "LOGIN_SUCCESS", jwt: token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = { login };
