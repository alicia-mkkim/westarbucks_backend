const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendDetail = async (req, res) => {
  try {
    const detail = await prisma.$queryRaw`
    SELECT
      p.id as id,
      p.korean_name as koreaName,
      p.english_name as englishName,
      JSON_ARRAYAGG(a.name)
    FROM products p 
      LEFT JOIN product_images pi ON pi.product_id = p.id
      LEFT JOIN products_allergies pa ON pa.product_id = p.id 
      LEFT JOIN allergies a ON pa.allergy_id = a.id
    GROUP BY p.id
    `;

    return res.status(200).json({ detail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { sendDetail };
