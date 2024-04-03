const {ColorNames,Productcard}=require('../models')
const addColorNames=async (req, res) => {
    const { ProductcardforeignId,colorCode,title} = req.body;
  
    try {
      // Assuming you have a model named "Products" and want to find a product by uuid
      const productcard = await Productcard.findOne({ where: { uuid: ProductcardforeignId } });
  
      if (!productcard) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Assuming you have a model named "Productcard" and want to create a new product card
      const productcardcolors = await ColorNames.create({
        ProductcardforeignId,
        colorCode,
        title
      });
  
      return res.json(productcardcolors);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' ,});
    }
}

const deleteColorNames = async (req, res) => {
    const id = req.params.id;
  
    try {
      const colorName = await ColorNames.findByPk(id);
  
      if (!colorName) {
        return res.status(404).json({ error: 'ColorName not found' });
      }
  
      await colorName.destroy();
      return res.json({ message: 'ColorName deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updateColorNames = async (req, res) => {
    const id = req.params.id;
    const { colorCode, title } = req.body;
  
    try {
      const colorName = await ColorNames.findByPk(id);
  
      if (!colorName) {
        return res.status(404).json({ error: 'ColorName not found' });
      }
  
      colorName.colorCode = colorCode;
      colorName.title = title;
  
      await colorName.save();
      return res.json(colorName);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getAllColorNames = async (req, res) => {
    try {
      const colorNames = await ColorNames.findAll();
      return res.json(colorNames);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getColorNamesById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const colorName = await ColorNames.findByPk(id);
  
      if (!colorName) {
        return res.status(404).json({ error: 'ColorName not found' });
      }
  
      return res.json(colorName);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports={
    addColorNames,
    deleteColorNames,
    updateColorNames,
    getAllColorNames,
    getColorNamesById
}