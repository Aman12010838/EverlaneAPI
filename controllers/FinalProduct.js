const {Products,Productcard,Prices,ColorNames,ClothCategory}=require('../models')

const showFinalProduct=async (req, res) => {
    try {
      const products = await Products.findAll({
        include: [
          {
            model: Productcard,
            as: 'productCards',
            include: [
              {
                model: Prices,
                as: 'prices',
              },
              {
                model: ColorNames, // Assuming you have a ColorName model
                as: 'colorNames',
              },
              {
                model: ClothCategory, // Assuming you have a ClothCategory model
                as: 'clothCategorys',
              },
            ],
          },
        ],
      })
  
      return res.json(products)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
}
module.exports={
    showFinalProduct,
}