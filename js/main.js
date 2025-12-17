const products = [
  {
    id: 1,
    slug: "galaxy-s24-ultra",
    title: "Samsung Galaxy S24 Ultra",
    description: "6.8-inch AMOLED display, Snapdragon 8 Gen 3, 200MP camera.",
    image: "./img/SamsungGalaxyS24Ultra_TOP-1080x608.jpeg ",
    old_price: 1499,
    price_after_sale: 1299,
    currency: "USD"
  },
  {
    id: 2,
    slug: "iphone-15-pro-max",
    title: "Apple iPhone 15 Pro Max",
    description: "A17 Pro chip, titanium design, 48MP camera, long battery life.",
    image: "./img/Apple-iPhone-15-Pro-lineup-color-lineup-geo-230912_big.jpg.large.jpg",
    old_price: 1599,
    price_after_sale: 1499,
    currency: "USD"
  },
  {
    id: 3,
    slug: "macbook-air-m3",
    title: "MacBook Air M3",
    description: "13-inch Retina display, M3 chip, 8GB RAM, 256GB SSD.",
    image: "./img/macbook air m3.jpg",
    old_price: 1399,
    price_after_sale: 1249,
    currency: "USD"
  },
  {
    id: 4,
    slug: "lenovo-legion-7",
    title: "Lenovo Legion 7",
    description: "AMD Ryzen 9, RTX 4070, 16GB RAM, 1TB SSD, 16-inch QHD display.",
    image: "./img/Lenovo-Legion-7-16ACHg6-Ryzen-7-5800H-16GB-1TB-RTX-3070-Win11-2.png",
    old_price: 2199,
    price_after_sale: 1999,
    currency: "USD"
  },
  {
    id: 5,
    slug: "anker-powercore-20000",
    title: "Anker PowerCore 20000mAh Power Bank",
    description: "High-capacity portable charger with fast charging.",
    image: "./img/618zKD+tgaL._AC_UF350,350_QL80_.jpg",
    old_price: 69,
    price_after_sale: 49,
    currency: "USD"
  },
  {
    id: 6,
    slug: "sony-wh-1000xm5",
    title: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise-canceling wireless headphones.",
    image: "./img/1717744762-Sonyheadphonescolors.jpg",
    old_price: 399,
    price_after_sale: 349,
    currency: "USD"
  },
  {
    id: 7,
    slug: "logitech-mx-master-3s",
    title: "Logitech MX Master 3S Mouse",
    description: "Ergonomic wireless mouse with precision tracking and fast scrolling.",
    image: "./img/mx-master-3s-business-product-callout.webp",
    old_price: 119,
    price_after_sale: 99,
    currency: "USD"
  },
  {
    id: 8,
    slug: "apple-airpods-pro-2",
    title: "Apple AirPods Pro (2nd Gen)",
    description: "Active noise cancellation, personalized spatial audio, USB-C case.",
    image: "./img/CMC_3690.webp",
    old_price: 299,
    price_after_sale: 269,
    currency: "USD"
  }
];





// =================================

// Rendering, Adding, Removing => cart 


const cards = document.querySelector(".cards");
const searchInput = document.querySelector(".search-inp");
const searchBtn = document.querySelector(".search-btn");

const cartIndicator = document.querySelector(".cart-indicator")


const cartProducts = [];

const addToCart = (id) => {
  cartProducts.push(id)
  renderProducts(products)
  cartIndicator.textContent = cartProducts.length
};


const removeFromCart = (id) => {
  const indexToRemove = cartProducts.findIndex((item) => item === id)
  cartProducts.splice(indexToRemove, 1)
  renderProducts(products)
  cartIndicator.textContent = cartProducts.length
};


function renderProducts(list) {
  cards.innerHTML = ""; 
  
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    
    cards.innerHTML += `
    <div class="card">
      <img src="${p.image}" alt="image">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="price">
        <span class="rp">${p.price_after_sale}$</span>
        <span class="wp"><div class="line"></div> ${p.old_price}$</span>
      </div>
      <div class="action">
      ${cartProducts.includes(p.id) ? `
        <button class="removing" onclick="removeFromCart(${p.id})">
        <img src="icons/cart.svg" alt="cart">
        Remove from cart
        </button>
        ` : `
        <button class="adding" onclick="addToCart(${p.id})">
        <img src="icons/cart.svg" alt="cart">
        Add to cart
        </button>
        `}
        <button  onclick="this.classList.toggle('active')" class="emotion">
          <img src="icons/Favorite.svg" alt="like">
        </button>
      </div>
    </div>

    `;
    }
    
    if (list.length === 0) {
      cards.innerHTML = `<p class="no-results">No products found</p>`;
    }
  };


  renderProducts(products);



  // =======================================

  // Searshing




function searchProducts() {
    const search = searchInput.value.toLowerCase().trim();
    
    if (search === "") {
      renderProducts(products);
      return;
    }
    
    const matchedProducts = [];
    
    for (let i = 0; i < products.length; i++) {
      const slug  = products[i].slug.toLowerCase();
      const title = products[i].title.toLowerCase();
      const desc  = products[i].description.toLowerCase();
      
      if (
        slug.includes(search) || title.includes(search) || desc.includes(search)
      ) {
        matchedProducts.push(products[i]);
      }
    }
    
    renderProducts(matchedProducts);
  }
  
  searchBtn.addEventListener("click", searchProducts);
  
  
  // ====================================
  
  
  // Comparing 
  
  const minInput = document.querySelector(".min-price");
  const maxInput = document.querySelector(".max-price");
  const priceBtn = document.querySelector(".price-btn");
  
  
  
  
  
  function filterByPrice() {
    const minVal = minInput.value.trim();
    const maxVal = maxInput.value.trim();
    
    let min = +(minVal);
  let max = +(maxVal);
  
  if (minVal === "" && maxVal === "") {
    renderProducts(products);
    return;
  }
  
  if (minVal !== "" && Number.isNaN(min)) {
    alert("من فضلك اكتب رقم صحيح في حقل أقل سعر");
    return;
  }
  
  if (maxVal !== "" && Number.isNaN(max)) {
    alert("من فضلك اكتب رقم صحيح في حقل أعلى سعر");
    return;
  }
  
  if (minVal === "") {
    min = 0;
  }
  
  if (maxVal === "") {
    max = Infinity;
  }
  
  if (min > max) {
    alert("أقل سعر لا يجب ان يكون أكبر من أعلى سعر");
    return;
  }
  
  const matchedProducts = [];
  
  for (let i = 0; i < products.length; i++) {
    const price = products[i].price_after_sale;
    
    if (price >= min && price <= max) {
      matchedProducts.push(products[i]);
    }
  }
  
  renderProducts(matchedProducts);
}




priceBtn.addEventListener("click", filterByPrice);


// =====================================


// cart click

const cartP = document.querySelector(".cart-p") 


let showingCart = false;

cartP.addEventListener("click", () => {
  showingCart = !showingCart;

  if (showingCart) {
    const cartList = [];
    for (let i = 0; i < products.length; i++) {
      if (cartProducts.includes(products[i].id)) {
        cartList.push(products[i]);
      }
    }
    renderProducts(cartList);
  } else {
    renderProducts(products);
  }
});




// =====================================================

// wish list



// ===============================
// WISH LIST (Add ONLY at the end)

// 1) بيانات الويش
let showingWish = false;
const wishedProducts = [];

// 2) نبني ليست الويش من products
function buildWishList() {
  const wishList = [];
  for (let i = 0; i < products.length; i++) {
    if (wishedProducts.includes(products[i].id)) wishList.push(products[i]);
  }
  return wishList;
}

// 3) نغلف renderProducts (بدون تعديل جوّاه) عشان نربط زرار القلب اللي جوّه الكارت
const _render = renderProducts;
renderProducts = function (list) {
  _render(list);

  const hearts = document.querySelectorAll(".emotion"); // دول بيتعملوا من renderProducts بتاعك
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].onclick = function () {
      const id = list[i].id;

      const idx = wishedProducts.indexOf(id);
      if (idx === -1) wishedProducts.push(id);
      else wishedProducts.splice(idx, 1);

      // لو انت فاتح الويش، خلي الشاشة تفضل ويش بعد التعديل
      if (showingWish) {
        renderProducts(buildWishList());
      }
    };
  }
};

// 4) كليك على القلب اللي فوق (اللي معلم عليه بالأحمر) يعرض/يرجع المنتجات
const wishIcon = document.querySelector(".wish-list");
wishIcon.addEventListener("click", () => {
  showingWish = !showingWish;
  showingCart = false; // عشان ما تتعارضش مع السلة

  if (showingWish) renderProducts(buildWishList());
  else renderProducts(products);
});

// 5) لو فتحت السلة اقفل وضع الويش (بدون تعديل كود السلة بتاعك)
cartP.addEventListener("click", () => {
  showingWish = false;
});

// 6) عشان يشتغل من أول مرة بعد ما ضفت البلوك ده
renderProducts(products);
