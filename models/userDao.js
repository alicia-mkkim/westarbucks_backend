const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
    select id from users where email=${email}
 `;
};

const createUser = async (email, encryptedPassword) => {
  const createUser = await prisma.$queryRaw`
    INSERT INTO users (email, password) VALUES (${email}, ${encryptedPassword})
    `;

  console.log("createUSer in DAO");
  return await prisma.$queryRaw`
     SELECT id, password, email from users where email =${email}; 
   `;
};

const checkUser = async (email, password) => {
  return await prisma.$queryRaw`
    select id, password from users where email=${email}
 `;
};

const foundUser = async (id) => {
  return await prisma.$queryRaw`
   Select id from users where id=${id};
  `;
};

module.exports = { getUserByEmail, createUser, checkUser, foundUser };
