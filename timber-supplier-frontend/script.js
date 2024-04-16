document.addEventListener('DOMContentLoaded', () => { 
  const showcaseContainer = document.getElementById('showcase-products');
  const popularContainer = document.getElementById('popular-products');
  const productListContainer = document.getElementById('productList');
  fetch('/api/products')
    .then((response) => response.json())
    .then((products) => {
      displayProducts(products, showcaseContainer);        
      displayProductsList(products, productListContainer);
    });
 
  fetch('/products/popular')
    .then((response) => response.json())
    .then((popularProducts) => {
      displayProducts(popularProducts, popularContainer);
    });
});

function displayProducts(products, container) {
  container.innerHTML = ''; 

  products.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

function displayProductsList(products, container) {
  container.innerHTML = ''; 

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
  image.src = `images/${product.image}`; 
  image.alt = product.name;
  image.classList.add('product-image');
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

  function showSlide() {
    bannerImages.forEach(img => img.classList.remove('active')); 
    bannerImages[currentSlide].classList.add('active'); 
    currentSlide++;
    if (currentSlide >= bannerImages.length) {
      currentSlide = 0; 
    }
    setTimeout(showSlide, 3000); 
  }

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
    setTimeout(showSlide, 5000); 
  }

  showSlide();
});


document.addEventListener("DOMContentLoaded", function() {
  const userRole = sessionStorage.getItem("userRole");

  if (userRole !== "admin") {
    window.location.href = "login.html";
  }

  const productList = document.getElementById("productList");
  const productForm = document.getElementById("addProductForm");

  function fetchProducts() {
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
      .then(data => {
        productList.innerHTML = "";

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

  fetchProducts();

  productForm.addEventListener("submit", function(event) {
    event.preventDefault();

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

        fetchProducts();
      })
      .catch(error => console.error("Error adding product:", error));
  });

  productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-delete")) {
      const productId = event.target.dataset.id;

      fetch(`http://localhost:3000/api/products/${productId}`, {
        method: "DELETE"
      })
        .then(response => response.json())
        .then(data => {
          fetchProducts();
        })
        .catch(error => console.error("Error deleting product:", error));
      }
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  const productContainer = document.getElementById('productContainer');

  try {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('product-image');
      const img = document.createElement('img');
      img.src = product.imagePath;
      img.alt = product.name;
      img.width = 500; 
      img.height = 500; 
      imgContainer.appendChild(img);

      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ₦${product.price}</p>
        <p>${product.description}</p>
        <a href="cart.html" class="btn">Buy Now</a> 
        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button> 
      `;

      productCard.appendChild(imgContainer); 
      productCard.appendChild(productDetails);
      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
    });
});

// function addToCart(productId) {
//     let cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     const existingProductIndex = cart.findIndex(item => item.id === productId);
//     if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity++;
//     } else {
//         cart.push({ id: productId, quantity: 1 });
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
// }
function addToCart(productId) {
    // fetch(`http://localhost:3000/api/products/${productId}`)
    //     .then(response => response.json())
    //     .then(product => {
    //         let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    //         const existingProductIndex = cart.findIndex(item => item.id === productId);

    //         if (existingProductIndex !== -1) {
    //             cart[existingProductIndex].quantity++;
    //         } else {
    //             cart.push({ ...product, quantity: 1 }); // Store the entire product object
    //         }

    //         localStorage.setItem('cart', JSON.stringify(cart));
    //     })
    //     .catch(error => console.error('Error fetching product:', error));

        fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
          let cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const existingProductIndex = cart.findIndex(item => item.id === productId);
    
          if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
          } else {
            cart.push({ 
              id: productId, 
              quantity: 1,
              name: product.name, 
              price: product.price 
            });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        })
        .catch(error => console.error('Error fetching product:', error));
    }
});



document.addEventListener('DOMContentLoaded', async () => {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  for (const cartItem of cart) {
      const productResponse = await fetch(`http://localhost:3000/api/products/${cartItem.id}`);
      const product = await productResponse.json();

      const cartItemElement = document.createElement('div');
      cartItemElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>Quantity: ${cartItem.quantity}</p>
          <p>Price: ₦${product.price * cartItem.quantity}</p>
          <button class="remove-from-cart" data-product-id="${product.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItemElement);
  }
  cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.dataset.productId;
        removeFromCart(productId);
    }
  });

  

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
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
})
.catch(error => {
console.error('Error:', error);
}); 

















