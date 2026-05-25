
function orderSummary(cart){
    let items = 0;
    let subtotal = 0;

  cart.forEach(item => {
    items += item.quantity;
    subtotal += item.priceCents/100 * item.quantity;
  });

  const shipping = 4.99;
  const totalBeforeTax = subtotal + shipping;
  const tax = totalBeforeTax * 0.10;
  const total = totalBeforeTax + tax;

    return `
    
        <div class="payment-summary-title">
            Order Summary
          </div>
          <div class="payment-summary-row">
            <div>Items (${items}):</div>
            <div class="payment-summary-money">$${subtotal.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shipping.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${total.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary" onclick="console.log(cart)">
            Place your order
          </button>
        </div>
      </div>
    </div>
    `;
}
function updateCartCount() {
    let items = 0;
  const cartCountElement = document.querySelector('.js-cart-count');
  cart.forEach(item => {
    items += item.quantity;
  });

  if (!cartCountElement) return;

  cartCountElement.textContent = items;
}
function itemsInCart(product) {
    return`
    <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${(product.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${product.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" onclick="removeFromCart('${product.name}')">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
   `
}
function renderCart() {

  updateCartCount();

  document.querySelector('.payment-summary').innerHTML =
    orderSummary(cart);

  document.querySelector('.order-summary').innerHTML =
    cart.map(itemsInCart).join('');
}
function removeFromCart(productName) {

  cart = cart.filter(item => item.name !== productName);

  localStorage.setItem('cart', JSON.stringify(cart));

  renderCart();
}
updateCartCount();


document.querySelector('.payment-summary').innerHTML = orderSummary(cart);
document.querySelector('.order-summary').innerHTML = cart.map(itemsInCart).join('');



