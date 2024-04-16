const express = require('express');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs'); 

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../timber-supplier-frontend/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '../timber-supplier-frontend')));
app.use(express.json()); 


let products = [
  { id: 1, name: 'Oak Timber', price: 5000, stock: 100, imagePath: 'images/product2.jpg' },
  { id: 2, name: 'Pine Timber', price: 3000, stock: 150, imagePath: 'images/product2.jpg' },
  { id: 3, name: 'Cedar Timber', price: 1040, stock: 120, imagePath: 'images/product2.jpg' },
];


app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  try {
    const { productName, price, stock, imagePath } = req.body;

    if (!productName || !price || !stock || !imagePath) {
      return res.status(400).send('Missing required product information.');
    }

    const newId = (products.length > 0) ? products[products.length - 1].id + 1 : 1;
    const newProduct = {
      id: newId,
      name: productName,
      price: parseFloat(price),
      stock: parseInt(stock),
      imagePath: imagePath
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Error adding product');
  }
});

app.post('/api/upload', upload.single('productImage'), async (req, res) => {
  try {
    const imagePath = req.file.path.replace(/\\/g, '/');

    await sharp(imagePath)
      .resize(150, 100)
      .toFile(imagePath)
      .catch(err => {
        console.error('Error resizing image:', err);
      });

    res.json({ imagePath: imagePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.delete('/api/products/:id', (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const productIndex = products.findIndex(p => p.id === productId);
  
      if (productIndex === -1) {
        return res.status(404).send('Product not found');
      }
  
      products.splice(productIndex, 1);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Error deleting product');
    }
  });
  

  async function resizeImagesInProducts() {
    for (const product of products) {
      const imagePath = path.join(__dirname, '../timber-supplier-frontend', product.imagePath);
      try {
        await sharp(imagePath)
          .resize(300, 150)
          .toFile(imagePath);
        console.log(`Resized image: ${product.imagePath}`);
      } catch (error) {
        console.error(`Error resizing image ${product.imagePath}:`, error);
      }
    }
  }


  app.post('/api/add-to-cart', (req, res) => {
    try {
        const { productId } = req.body;
        let cart = req.session.cart || []; 

        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        req.session.cart = cart; 

        res.json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Error adding to cart');
    }
});


