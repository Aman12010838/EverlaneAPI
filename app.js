const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

const {sequelize}=require('./models')
const products=require('./controllers/Products')
const productcards=require('./controllers/ProductCard')
const prices=require('./controllers/Prices')
const colornames=require('./controllers/ColorNames')
const clothcategory=require('./controllers/ClothCategory')
const finalProduct=require('./controllers/FinalProduct')


app.use(cors());

app.post('/product', products.addProducts)
app.post('/productcard',productcards.addProductCard );
app.post('/colornames',colornames.addColorNames);
app.post('/prices',prices.addPrices);
app.post('/clothcategory',clothcategory.addClothCategory);


app.get('/clothcategory', clothcategory.getAllClothCategories);
app.get('/clothcategory/:id', clothcategory.getClothCategoryById);
app.get('/productfinal',finalProduct.showFinalProduct)
app.get('/product',products.showProducts)
app.get('/product/:id',products.getProductById)
app.get('/productcard/:id', productcards.getProductCardById);
app.get('/prices', prices.getAllPrices);
app.get('/prices/:id', prices.getPricesById);
app.get('/colornames', colornames.getAllColorNames);
app.get('/colornames/:id', colornames.getColorNamesById);
app.get('/productcard', productcards.getAllProductCards);


app.put('/productcard/:id', productcards.updateProductCard);
app.put('/prices/:id', prices.updatePrices);
app.put('/product/:id',products.updateProduct)
app.put('/colornames/:id', colornames.updateColorNames);
app.put('/clothcategory/:id', clothcategory.updateClothCategory);


app.delete('/product/:id',products.deleteProduct)
app.delete('/productcard/:id', productcards.deleteProductCard);
app.delete('/prices/:id', prices.deletePrices);
app.delete('/colornames/:id', colornames.deleteColorNames);
app.delete('/clothcategory/:id', clothcategory.deleteClothCategory);


app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})


