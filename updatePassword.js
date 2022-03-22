const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updatePassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await prisma.$queryRaw`
    SELECT id from users where email = ${email}
  `;
    if (user.length === 0) {
      const error = new Error("회원이 아닙니다");
      error.statusCode = 409;
      throw error;
    }
    const upDatePassword = await prisma.$queryRaw`
        UPDATE users SET password = ${password} where email = ${email};
      `;
    return res.status(201).json({ message: "password has changed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = { updatePassword };
