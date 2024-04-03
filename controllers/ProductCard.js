const {Productcard,Products} =require('../models')


const addProductCard=async (req, res) => {
    const { ProductforeignId,imageURL, title, sizeRoman, sizeNumber, color, category, isAvailable,totalProductSale} = req.body;
    try {
      const product = await Products.findOne({ where: { uuid: ProductforeignId } });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const productcard = await Productcard.create({
        ProductforeignId,
        imageURL,
        title,
        sizeRoman,
        sizeNumber,
        color,
        category,
        isAvailable,
        totalProductSale
      });
  
      return res.json(productcard);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' ,});
    }
}

// Get Product Card by ID
const getProductCardById = async (req, res) => {
  const productCardId = req.params.id;
  const { color, sizeRoman, sizeNumber, category } = req.query;

  try {
      const filter = {
          include: ['prices', 'colorNames', 'clothCategorys'],
          where: { id: productCardId },
      };

      // Add additional filters if provided
      if (color) filter.where.color = color;
      if (sizeRoman) filter.where.sizeRoman = sizeRoman;
      if (sizeNumber) filter.where.sizeNumber = sizeNumber;
      if (category) filter.where.category = category;

      const productCard = await Productcard.findOne(filter);

      if (!productCard) {
          return res.status(404).json({ error: 'Product Card not found' });
      }

      return res.json(productCard);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
  // Update Product Card
  const updateProductCard = async (req, res) => {
    const productCardId = req.params.id;
    const { imageURL, title, sizeRoman, sizeNumber, color, category, isAvailable } = req.body;
  
    try {
      const productCard = await Productcard.findByPk(productCardId);
  
      if (!productCard) {
        return res.status(404).json({ error: 'Product Card not found' });
      }
  
      // Update the product card attributes
      productCard.imageURL = imageURL;
      productCard.title = title;
      productCard.sizeRoman = sizeRoman;
      productCard.sizeNumber = sizeNumber;
      productCard.color = color;
      productCard.category = category;
      productCard.isAvailable = isAvailable;
  
      // Save the updated product card
      await productCard.save();
  
      return res.json(productCard);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete Product Card
  const deleteProductCard = async (req, res) => {
    const productCardId = req.params.id;
  
    try {
      const productCard = await Productcard.findByPk(productCardId);
  
      if (!productCard) {
        return res.status(404).json({ error: 'Product Card not found' });
      }
  
      // Delete the product card
      await productCard.destroy();
  
      return res.json({ message: 'Product Card deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getAllProductCards = async (req, res) => {
    const { sizeRoman, sizeNumber, color, category } = req.query;
  
    try {
      // Build the filter object based on the provided query parameters
      const filter = {
        include: ['prices', 'colorNames', 'clothCategorys'],
        where: {},
      };
  
      // Add filters to the Sequelize query if they are provided in the request
      if (sizeRoman) filter.where.sizeRoman = sizeRoman;
      if (sizeNumber) filter.where.sizeNumber = sizeNumber;
      if (color) filter.where.color = color;
      if (category) filter.where.category = category;
  
      const productCards = await Productcard.findAll(filter);
  
      return res.json(productCards);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports={
    addProductCard,
    getProductCardById,
    updateProductCard,
    deleteProductCard,
    getAllProductCards
}