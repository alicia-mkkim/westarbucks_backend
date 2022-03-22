const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async () => {
  return await prisma.$queryRaw`
    SELECT
    p.id as id,
    p.korean_name AS koreanName,
    p.english_name AS englishName,
    c.name as category,
    c.id as categoryId, 
    JSON_ARRAYAGG(image_url)
    from products p
    JOIN categories c
    ON p.category_id = c.id
    JOIN product_images pi
    ON pi.product_id = p.id
    group by p.id
    `;
};

const getCategories = async () => {
  return await prisma.$queryRaw`
    SELECT id, name FROM categories ORDER BY id ;
 `;
};

module.exports = { getCategories, getProducts };
