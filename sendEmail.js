const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendEmail = async (req, res) => {
  try {
    const getUsers = await prisma.$queryRaw`
        SELECT email from users
        ORDER BY id
      `;
    console.log(getUsers);
    return res.status(201).json({ getUsers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { sendEmail };
