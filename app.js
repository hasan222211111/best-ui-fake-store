let cart=[]   // initially cart ki value empty hai,agar yeh nahi kro ghy tu wo add nahi kre gha array mein
let productsData=[] //yeh products ko render krta hai

let productsDiv = document.getElementById("products");// ab jo humne div banaya tha products ke liye wo hai yeh jisme cards bne huwe hain
console.log(productsDiv);
let cartDiv = document.getElementById("cart");  // yeh wo button hai jisme onclick lagaya hai
let cartItemsDiv = document.getElementById("cart-items");
let cartCount = document.getElementById("cart-count");
let totalSpan = document.getElementById("total");

/* Fetch products */
async function fetchProducts() {
    let response = await fetch("https://fakestoreapi.com/products");
    productsData = await response.json();
    showProducts();  // jab tk hum isko idhar call nahi kren ghy items show nahi hou ghy
}
fetchProducts();

/* now this function shows the products*/
function showProducts() {
  let cardshow = "";

  for (let i = 0; i < productsData.length; i++) {   // yeh tu card hai jisme image,desc saab show hou ghy,idhar concatenation ka concept lagaya hai
    cardshow += `          
      <div class="card">                       
       <h3>${productsData[i].category}</h3>  
        <img src="${productsData[i].image}">
        <h4>${productsData[i].title}</h4>
        <p class="amount">$${productsData[i].price}</p>
        <p class="desc">${productsData[i].description}
       

        <button onclick="addToCart(${productsData[i].id})">
          Add to Cart
        </button>
      </div>
    `;
  }

  productsDiv.innerHTML = cardshow;
}

/* Add to cart */
function addToCart(id) {
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty++;
      found = true;
      break;
    }
  }

  if (!found) {
    const product = productsData.find(p => p.id === id);
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      qty: 1
    });
  }

  updateCart();
}

/* Update cart UI */
function updateCart() {
  let html = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;

    html += `
      <div class="cart-item">
        <h5>${cart[i].title}</h5>
        <p>$${cart[i].price} × ${cart[i].qty}</p>
        <button onclick="decreaseQty(${i})">-</button>
        <button onclick="increaseQty(${i})">+</button>
        <button onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;
  }

  cartItemsDiv.innerHTML = html;
  cartCount.innerText = cart.length;
  totalSpan.innerText = total.toFixed(2);
}

/* Quantity controls */
function increaseQty(index) {
  cart[index].qty++;
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

/* Toggle cart */
function toggleCart() {
  cartDiv.style.display =
    cartDiv.style.display === "block" ? "none" : "block";
}
