const {Products} = require('../models')
const showProducts=async (req, res) => {
    try {
      const products = await Products.findAll()
  
      return res.json(products)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
}

const addProducts=async (req, res) => {
    const { name, description } = req.body
  
    try {
      const product = await Products.create({ name,description })
  
      return res.json(product)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description } = req.body;
  
    try {
      let product = await Products.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      product.name = name;
      product.description = description;
      await product.save();
  
      return res.json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
  

const deleteProduct = async (req, res) => {
    const productId = req.params.id; 
  
    try {
      const product = await Products.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      await product.destroy();
  
      return res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
  

const getProductById = async (req, res) => {
    const productId = req.params.id; 
    try {
      const product = await Products.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      return res.json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };



module.exports={
    showProducts,
    addProducts,
    updateProduct,
    deleteProduct,
    getProductById
}