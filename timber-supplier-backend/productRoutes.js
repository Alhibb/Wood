// productRoutes.js

const express = require('express');
const router = express.Router();

const latestProducts = [
  { id: 101, name: 'Product A', price: 100, stock: 25, imagePath: '/images/product1.jpg' },
  { id: 102, name: 'Product B', price: 150, stock: 30, imagePath: '/images/product2.jpg' },
  { id: 103, name: 'Product C', price: 200, stock: 15, imagePath: '/images/product3.jpg' },
  { id: 104, name: 'Product D', price: 250, stock: 10, imagePath: '/images/product4.jpg' }
];


app.get('/api/latest-products', (req, res) => {
  res.json(latestProducts);
});


let products = [
  { id: 1, name: 'Teak Timber', price: 5000 },
  { id: 2, name: 'Mahogany Timber', price: 7000 },
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const id = products.length + 1;
  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  product.name = name;
  product.price = price;
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id !== parseInt(id));
  res.sendStatus(204);
});

module.exports = router;









