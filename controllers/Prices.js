const {Prices,Productcard}=require('../models')

const addPrices=async (req, res) => {
    const { ProductcardforeignId,originalPrice,discountedPrice,offer} = req.body;
  
    try {
      // Assuming you have a model named "Products" and want to find a product by uuid
      const prices = await Productcard.findOne({ where: { uuid: ProductcardforeignId } });
  
      if (!prices) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Assuming you have a model named "Productcard" and want to create a new product card
      const productcardprices = await Prices.create({
        ProductcardforeignId,
        originalPrice,
        discountedPrice,
        offer
      });
  
      return res.json(productcardprices);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' ,});
    }
  }

  const deletePrices = async (req, res) => {
    const { id } = req.params;

    try {
        const prices = await Prices.findByPk(id);

        if (!prices) {
            return res.status(404).json({ error: 'Prices not found' });
        }

        await prices.destroy();

        return res.json({ message: 'Prices deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePrices = async (req, res) => {
    const { id } = req.params;
    const { originalPrice, discountedPrice, offer } = req.body;

    try {
        let prices = await Prices.findByPk(id);

        if (!prices) {
            return res.status(404).json({ error: 'Prices not found' });
        }

        prices.originalPrice = originalPrice;
        prices.discountedPrice = discountedPrice;
        prices.offer = offer;

        await prices.save();

        return res.json(prices);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllPrices = async (req, res) => {
    try {
        const prices = await Prices.findAll();

        return res.json(prices);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPricesById = async (req, res) => {
    const { id } = req.params;

    try {
        const prices = await Prices.findByPk(id);

        if (!prices) {
            return res.status(404).json({ error: 'Prices not found' });
        }

        return res.json(prices);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports={
    addPrices,
    deletePrices,
    updatePrices,
    getAllPrices,
    getPricesById
}