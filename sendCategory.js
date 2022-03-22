const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendCategory = async (req, res) => {
  try {
    const categories = await prisma.$queryRaw`
    SELECT id, name FROM categories ORDER BY id ;
 `;
    return res.status(200).json({ category: categories });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = { sendCategory };
