document.addEventListener('DOMContentLoaded', () => { 
  const showcaseContainer = document.getElementById('showcase-products');
  const popularContainer = document.getElementById('popular-products');
  const productListContainer = document.getElementById('productList');
  // Fetch showcase products
  fetch('/api/products')
    .then((response) => response.json())
    .then((products) => {
      // Display showcase products on homepage
      displayProducts(products, showcaseContainer);        
      // Display products in list format on products page
      displayProductsList(products, productListContainer);
    });
 
  // Fetch popular products
  fetch('/products/popular')
    .then((response) => response.json())
    .then((popularProducts) => {
      displayProducts(popularProducts, popularContainer);
    });
});

function displayProducts(products, container) {
  container.innerHTML = ''; // Clear previous content

  products.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

function displayProductsList(products, container) {
  container.innerHTML = ''; // Clear previous content

  products.forEach((product) => {
    const productItem = document.createElement('li');
    productItem.textContent = `${product.name} - ₦${product.price}`;
    container.appendChild(productItem);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  const image = document.createElement('img');
  image.src = `images/${product.image}`; // Add actual image path
  image.alt = product.name;
  card.appendChild(image);

  const name = document.createElement('h3');
  name.textContent = product.name;
  card.appendChild(name);

  const price = document.createElement('p');
  price.textContent = `Price: ₦${product.price}`;
  card.appendChild(price);

  const buyButton = document.createElement('a'); 
  buyButton.classList.add('btn');
  buyButton.textContent = 'Buy Now';
  buyButton.href = 'cart.html'; 
  card.appendChild(buyButton);

  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  const bannerImages = document.querySelectorAll('.banner-img');
  let currentSlide = 0;

  // Function to show the current slide and hide the rest
  function showSlide() {
    bannerImages.forEach(img => img.classList.remove('active')); // Hide all images
    bannerImages[currentSlide].classList.add('active'); // Show the current slide
    currentSlide++;
    if (currentSlide >= bannerImages.length) {
      currentSlide = 0; // Reset to the first image after reaching the end
    }
    setTimeout(showSlide, 3000); // Change image every 3 seconds (3000 milliseconds)
  }

  // Start the slideshow
  showSlide();
});


document.addEventListener('DOMContentLoaded', () => {
  const testimonialSlider = document.querySelector('.testimonial-slider');

  const testimonials = [
    {
      text: 'Great quality timber products and excellent customer service. Highly recommended!',
      author: 'John Adekunle'
    },
    {
      text: 'TimberTraders Inc. always delivers on time and their products are top-notch.',
      author: 'Jane Odunayo'
    },
    {
      text: 'The timber quality exceeded my expectations. Fantastic experience overall.',
      author: 'Abdullahi Ibrahim'
    },
    {
      text: 'I am very satisfied with the variety of timber products offered. Will buy again!',
      author: 'Aisha Usman'
    },
    {
      text: 'Professional service and high-grade timber. A reliable supplier indeed.',
      author: 'Muhammad Aliyu'
    },
    {
      text: 'Exceptional timber quality. Definitely one of the best suppliers in the market.',
      author: 'Fatima Abdullahi'
    },
    {
      text: 'Efficient delivery and great customer support. Highly recommended!',
      author: 'Ahmad Sani'
    },
    {
      text: 'Top-notch timber products with a wide range to choose from. Very impressed!',
      author: 'Zainab Musa'
    },
    {
      text: 'Reliable and trustworthy supplier. Quality timber delivered as promised.',
      author: 'Yusuf Ibrahim'
    }
  ];

  testimonials.forEach(testimonial => {
    const slide = document.createElement('div');
    slide.classList.add('testimonial-slide');
    slide.innerHTML = `
      <p>${testimonial.text}</p>
      <span>- ${testimonial.author}</span>
    `;
    testimonialSlider.appendChild(slide);
  });

  let currentSlide = 0;

  function showSlide() {
    const slides = document.querySelectorAll('.testimonial-slide');
    slides.forEach(slide => slide.style.display = 'none');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
    setTimeout(showSlide, 5000); // Change slide every 5 seconds (5000 milliseconds)
  }

  showSlide();
});


document.addEventListener("DOMContentLoaded", function() {
  const userRole = sessionStorage.getItem("userRole");

  if (userRole !== "admin") {
    // Redirect to login page if user is not logged in as admin
    window.location.href = "login.html";
  }

  // Admin-specific functionality
  const productList = document.getElementById("productList");
  const productForm = document.getElementById("addProductForm");

  // Function to fetch and display products
  function fetchProducts() {
    // Make API call to fetch products
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
      .then(data => {
        // Clear previous product list
        productList.innerHTML = "";

        // Iterate through products and create product cards
        data.forEach(product => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>₦${product.price}</p>
            <button data-id="${product.id}" class="btn-delete">Delete</button>
          `;
          productList.appendChild(productCard);
        });
      })
      .catch(error => console.error("Error fetching products:", error));
  }

  // Fetch and display products on page load
  fetchProducts();

  // Add event listener for product form submission
  productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get product name, price, and stock from form
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("price").value;
    const productStock = document.getElementById("stock").value;

    // Make API call to add product
    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: productName, price: productPrice, stock: productStock })
    })
      .then(response => response.json())
      .then(data => {
        // Clear form fields
        productForm.reset();

        // Fetch and display updated product list
        fetchProducts();
      })
      .catch(error => console.error("Error adding product:", error));
  });

  // Event delegation for delete button clicks
  productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-delete")) {
      const productId = event.target.dataset.id;

      // Make API call to delete product
      fetch(`http://localhost:3000/api/products/${productId}`, {
        method: "DELETE"
      })
        .then(response => response.json())
        .then(data => {
          // Fetch and display updated product list
          fetchProducts();
        })
        .catch(error => console.error("Error deleting product:", error));
      }
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  const productContainer = document.getElementById('productContainer');

  try {
    // Fetch products from the server
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();

    // Loop through the products and create product cards
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('product-image');
      const img = document.createElement('img');
      img.src = product.imagePath;
      img.alt = product.name;
      img.width = 500; // Set width to 300 pixels
      img.height = 500; // Set height to 200 pixels
      imgContainer.appendChild(img);

      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ₦${product.price}</p>
        <p>${product.description}</p>
        <a href="cart.html" class="btn">Buy Now</a> 
      `;

      productCard.appendChild(imgContainer); // Add image container instead of direct image
      productCard.appendChild(productDetails);
      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

const sharp = require('sharp');
document.addEventListener('DOMContentLoaded', async () => {
const showcaseContainer = document.getElementById('showcaseContainer');
try {
  // Fetch products from the server
  const response = await fetch('http://localhost:3000/api/products');
  const products = await response.json();
  // Check if products array is not empty
  if (Array.isArray(products) && products.length > 0) {
    products.forEach(async product => {
      // Resize image using sharp
      const resizedImageBuffer = await sharp(product.imagePath)
        .resize(100, 100)
        .toBuffer();
      // Convert resized image buffer to base64 data URL
      const resizedImageDataUrl = `data:image/jpeg;base64,${resizedImageBuffer.toString('base64')}`;
      // Create a product card for each product
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      const productImage = document.createElement('div');
      productImage.classList.add('product-image');
      const img = document.createElement('img');
      img.src = resizedImageDataUrl;
      img.alt = product.name;
      productImage.appendChild(img);
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ₦${product.price}</p>
        <p>${product.description}</p>
        <button class="btn">Buy Now</button>
      `;
      productCard.appendChild(productImage);
      productCard.appendChild(productDetails);
      showcaseContainer.appendChild(productCard);
    });
  } else {
    // Handle case where no products are fetched
    showcaseContainer.innerHTML = '<p>No products available</p>';
  }
} catch (error) {
  console.error('Error fetching products:', error);
  showcaseContainer.innerHTML = '<p>Error fetching products</p>';
}
});

fetch('http://localhost:3000/api/products', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({ productName, price, stock, imagePath }),
})
.then(response => {
console.log('Response from server:', response);
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
console.log('Server response data:', data);
// Handle success
})
.catch(error => {
console.error('Error:', error);
// Handle error
}); 

// ... other code ...

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card'); 
  // ... Other card creation logic ...
  const buyButton = document.createElement('button');
  buyButton.classList.add('btn');
  buyButton.textContent = 'Buy Now';
  buyButton.addEventListener('click', () => {
    window.location.href = 'cart.html'; // Redirect to cart page on click
  });
  card.appendChild(buyButton);
  // ... Rest of the card creation logic ...
  return card;
} 














