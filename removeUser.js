const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const removeUser = async (req, res) => {
  try {
    const { email } = req.body;
    const deleteServer = await prisma.$queryRaw`
        DELETE FROM users WHERE email=${email}
      `;

    return res.status(201).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { removeUser };
