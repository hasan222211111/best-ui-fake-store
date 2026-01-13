let cart=[]   // initially cart ki value empty hai,agar yeh nahi kro ghy tu wo add nahi kre gha array mein
let productsData=[] //yeh products ko render krta hai

let productsDiv = document.getElementById("products");// ab jo humne div banaya tha products ke liye wo hai yeh jisme cards bne huwe hain
// console.log(productsDiv);
let cartDiv = document.getElementById("cart");  // yeh wo button hai jisme onclick lagaya hai
let cartItemsDiv = document.getElementById("cart-items");
let cartCount = document.getElementById("cart-count");
let totalSpan = document.getElementById("total");

/* Fetch products */
async function fetchProducts() {
    let response = await fetch("https://fakestoreapi.com/products");
    productsData = await response.json(); // yeh array hai products ka
    showProducts(); // jab tk hum isko idhar call nahi kren ghy items show nahi hou ghy
}
fetchProducts();

/* now this function shows the products in the main screen*/
function showProducts() {
  // Containers
  const mensContainer = document.getElementById("mens-container");
  const womensContainer = document.getElementById("womens-container");
  const electronicsContainer = document.getElementById("electronics-container");
  const jewelryContainer = document.getElementById("jewelry-container");

  const copy = document.getElementById("product-card-template");

  // Clear existing products
  mensContainer.innerHTML = "";
  womensContainer.innerHTML = "";
  electronicsContainer.innerHTML = "";
  jewelryContainer.innerHTML = "";

  productsData.forEach(product => {
    const card = copy.cloneNode(true);
    card.style.display = "block";

    card.querySelector(".category").textContent = product.category;
    card.querySelector(".product-img").src = product.image;
    card.querySelector(".title").textContent = product.title;
    card.querySelector(".amount").textContent = `$${product.price}`;
    card.querySelector(".desc").textContent = product.description;

    card.querySelector(".add-btn").onclick = function() {
      addToCart(product.id);
    };

    // Append based on category
    switch (product.category.toLowerCase()) {
      case "men's clothing":
        mensContainer.appendChild(card);
        break;
      case "women's clothing":
        womensContainer.appendChild(card);
        break;
      case "electronics":
        electronicsContainer.appendChild(card);
        break;
      case "jewelery":
        jewelryContainer.appendChild(card);
        break;
      default:
        break;
    }
  });
}



/* Add to cart */
// function addToCart(id) {
//     let found = cart.find(item => item.id === id);
//   if (found) {
//     found.quantity++; // quantity plus hoti jae ghi jab bhi click kro ghy
//   } else {
//   let product = productsData.find(product => product.id === id);  //productsData array se wo product find karta hai jiska id given id ke barabar ho
//   cart.push({...product, quantity: 1});  // copies all properties including image,idhar humne rest parameter lagaya hai
// }
//   updateCart();
// }
function addToCart(id) {
  let found = cart.find(item => item.id === id);

  if (found) {
    found.quantity++;
  } else {
    let product = productsData.find(product => product.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  showToast(); // ✅ BOOM — toast here
}


/* Update cart UI */
function updateCart() {
  let html = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price * item.quantity;

    html += `
      <div class="cart-item">
        <img src="${item.image}" class="item-img" />
        <div class="item-info">
          <h5>${item.title}</h5>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
        <div class="item-buttons">
          <button onclick="decreaseQty(${i})" class="decrease-btn">-</button>
          <button onclick="increaseQty(${i})" class="increase-btn">+</button>
          <button onclick="removeFromCart(${i})" class="remove-btn">Remove</button>
        </div>
      </div>
    `;
  }

  cartItemsDiv.innerHTML = html;    // yeh cart ka variable banaya hai humne yeh wo hai
  cartCount.innerText = cart.length;
  totalSpan.innerText = total;  // yeh total amount batae gha humhe
}


/* Quantity controls */
function increaseQty(i) {
  cart[i].quantity++;
  updateCart();
}

function decreaseQty(i) {
  if (cart[i].quantity > 1) {   // yeh decrease krne ke liye hai
    cart[i].quantity--;
  } else {
    cart.splice(i, 1);
  }
  updateCart();
}

function removeFromCart(hasan) {
  cart.splice(hasan, 1);
  updateCart();
}

// toggle cart hai yeh clickable
function toggleCart() {   // isi se open and close horha hai cart button
  cartDiv.style.display = 
  cartDiv.style.display === "block" ? "none" : "block";
}


// proceed pr click kro tu redirect krde login pr
function proceed() {
    alert("Login First Then proceed");
    window.location.href = "login.html"; 
}


//toast
function showToast() {
  let toastEl = document.getElementById('cartToast');
  let toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();
}


  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      if (timer) clearTimeout(timer); // time clear kro aik sec ke baad
      setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  }
