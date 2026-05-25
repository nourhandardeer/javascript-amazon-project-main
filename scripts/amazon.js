
function generateQuantityOptions() {
  let options = '';
  for (let i = 1; i <= 10; i++) {
    options += `<option ${i === 1 ? 'selected' : ''} value="${i}">${i}</option>`;
  }
  return options;
}


function renderProduct(product) {
  return `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}" >
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" >
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>
      <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">${generateQuantityOptions()}</select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart" id="${product.id}">
        <img src="images/icons/checkmark.png"> Added
      </div>
      <button class="add-to-cart-button button-primary" onclick="addToCart('${product.id}')">
        Add to Cart
      </button>
    </div>
  `;
}

function addToCart(productId) {
  const addedMsg = document.getElementById(productId);
  addedMsg.classList.add('visible');
  setTimeout(() => addedMsg.classList.remove('visible'), 2000);
  const product = products.find((item) => {
    return item.id === productId;
  });
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  cart.push({name: product.name, priceCents: product.priceCents, image: product.image, quantity: parseInt(quantitySelector.value)});
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);
  updateCartQuantity();
}

function updateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').textContent =
    totalQuantity;
}
updateCartQuantity();


// Render all products into the grid
document.querySelector('.products-grid').innerHTML = products.map(renderProduct).join('');