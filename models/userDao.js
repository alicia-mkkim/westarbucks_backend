const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
    select id from users where email=${email}
 `;
};

const createUser = async (email, encryptedPassword) => {
  return await prisma.$queryRaw`
    INSERT INTO users (email, password) VALUES (${email}, ${encryptedPassword})
    `;
};

const checkUser = async (email, password) => {
  return await prisma.$queryRaw`
    select id, password from users where email=${email}
 `;
};

module.exports = { getUserByEmail, createUser, checkUser };
