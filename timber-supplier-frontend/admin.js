document.addEventListener('DOMContentLoaded', () => {
  const userRole = sessionStorage.getItem('userRole');
  if (userRole !== 'admin') {
    window.location.href = 'login.html'; 
    return; 
  }
  const addProductForm = document.getElementById('addProductForm');
    const productList = document.getElementById('productList');
  
    const createProductCard = (productName, price, stock, imagePath) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      const productInfo = document.createElement('div');
      productInfo.innerHTML = `
        <img src="${imagePath}" alt="${productName}">
        <div>
          <h3>${productName}</h3>
          <p>Price: ₦${price}</p>
          <p>Stock: ${stock}</p>
        </div>
      `;
      productCard.appendChild(productInfo);
      productList.appendChild(productCard);
    };
  
    const fetchExistingProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();
        products.forEach(({ name, price, stock, imagePath }) => {
          createProductCard(name, price, stock, imagePath);
        });
      } catch (error) {
        console.error('Error fetching existing products:', error);
      }
    };
  
    fetchExistingProducts();
  
    addProductForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(addProductForm);
      const productName = formData.get('productName');
      const price = formData.get('price');
      const stock = formData.get('stock');
      const productImage = formData.get('productImage');
  
      try {
        const imageFormData = new FormData();
        imageFormData.append('productImage', productImage);
        const imageResponse = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: imageFormData
        });
        const { imagePath } = await imageResponse.json();
  
        // Add product data to the server
        const productResponse = await fetch('http://localhost:3000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productName, price, stock, imagePath })
        });
  
        if (!productResponse.ok) {
          throw new Error('Failed to add product.');
        }
  
        const newProduct = await productResponse.json();
        console.log('Product added successfully:', newProduct);
  
        createProductCard(productName, price, stock, imagePath);
  
        addProductForm.reset();
  
        fetchExistingProducts(); 
      } catch (error) {
        console.error('Error adding product:', error);
      }
    });
  });
  
  
  productList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-delete')) {
      const productId = event.target.dataset.id;
  
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete product.');
        }
  
        event.target.closest('.product-card').remove();
  
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }

    
  });
  