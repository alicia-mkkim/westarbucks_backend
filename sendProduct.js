const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendProduct = async (req, res) => {
  try {
    const product = await prisma.$queryRaw`
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

    return res.status(200).json({ product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { sendProduct };
