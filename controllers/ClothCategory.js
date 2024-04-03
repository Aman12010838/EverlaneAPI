const {ClothCategory,Productcard}=require('../models')
const addClothCategory=async (req, res) => {
    const { ProductcardforeignId,title} = req.body;
  
    try {
      // Assuming you have a model named "Products" and want to find a product by uuid
      const productcard = await Productcard.findOne({ where: { uuid: ProductcardforeignId } });
  
      if (!productcard) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Assuming you have a model named "Productcard" and want to create a new product card
      const productcardcloths = await ClothCategory.create({
        ProductcardforeignId,
        title
      });
  
      return res.json(productcardcloths);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' ,});
    }
}

const deleteClothCategory = async (req, res) => {
    const id = req.params.id;
  
    try {
      const clothCategory = await ClothCategory.findOne(id);
  
      if (!clothCategory) {
        return res.status(404).json({ error: 'ClothCategory not found' });
      }
  
      await clothCategory.destroy();
      return res.json({ message: 'ClothCategory deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updateClothCategory = async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
  
    try {
      const clothCategory = await ClothCategory.findOne(id);
  
      if (!clothCategory) {
        return res.status(404).json({ error: 'ClothCategory not found' });
      }
  
      clothCategory.title = title;
  
      await clothCategory.save();
      return res.json(clothCategory);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getAllClothCategories = async (req, res) => {
    try {
      const clothCategories = await ClothCategory.findAll();
      return res.json(clothCategories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getClothCategoryById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const clothCategory = await ClothCategory.findOne(id);
  
      if (!clothCategory) {
        return res.status(404).json({ error: 'ClothCategory not found' });
      }
  
      return res.json(clothCategory);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports={
    addClothCategory,
    deleteClothCategory,
    updateClothCategory,
    getAllClothCategories,
    getClothCategoryById
}