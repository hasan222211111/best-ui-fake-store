const allSections = document.getElementById("all-sections");

const sections = [
  { title: "Featured Products", desc: "Handpicked top items just for you" },
  { title: "New Arrivals", desc: "Check out the latest additions" },
  { title: "Best Sellers", desc: "Most popular products our customers love" },
  { title: "On Sale", desc: "Great deals and discounts available now" },
  { title: "Recommended", desc: "Trending items you might like" },
];

async function fetchProducts() {
  
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    allSections.innerHTML = "";

    sections.forEach((section, index) => {
      const sectionProducts = products.slice(index * 4, index * 4 + 4);

      const sectionHTML = `
        <div class="section-container mb-5" id="${section.title}">
          <div class="d-flex justify-content-between align-items-end mb-4 section-header">
            <div>
              <h2 class="fw-bold m-0">${section.title}</h2>
              <p class="text-muted m-0 small">${section.desc}</p>
            </div>
            <a href="#" class="btn btn-sm btn-link text-decoration-none fw-bold text-indigo">View All <i class="fa-solid fa-arrow-right ms-1"></i></a>
          </div>
          
          <div class="row g-4">
            ${sectionProducts
              .map(
                (product) => `
              <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="modern-card">
                  <div class="floating-actions">
                    <button class="action-btn wishlist"><i class="fa-regular fa-heart"></i></button>
                    <button class="action-btn quick-view"><i class="fa-solid fa-expand"></i></button>
                  </div>
                  
                  <span class="category-badge">${product.category}</span>
                  
                  <div class="img-wrap">
                    <img src="${product.image}" alt="${product.title}">
                  </div>

                  <div class="card-content">
                    <div class="d-flex align-items-center mb-2">
                        <div class="rating-box me-2">
                            <i class="fa-solid fa-star"></i>
                            <span>${
                              product.rating ? product.rating.rate : "4.5"
                            }</span>
                        </div>
                    </div>
                    
                    <h6 class="title" title="${product.title}">${
                  product.title
                }</h6>
                    <p class="desc">${product.description.slice(0, 60)}...</p>
                    
                    <div class="card-footer-custom">
                      <div class="price-box">
                        <span class="currency">$</span>
                        <span class="amount">${product.price}</span>
                      </div>
                      <button class="add-cart-btn" title="Add to Cart">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
      allSections.innerHTML += sectionHTML;
    });

  }


fetchProducts();