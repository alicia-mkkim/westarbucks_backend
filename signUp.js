const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.$queryRaw`
    select * from users 
  `;

  res.status(200).json({ user });
};

module.exports = { signUp };
