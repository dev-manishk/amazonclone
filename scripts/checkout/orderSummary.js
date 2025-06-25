import { cart, removeFromCart, calculateCartQuantity,updateDeliveryOption,updateQuantity } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import { formatCurrency } from "../util/money.js";

import { deliveryOptions,getDeliveryOption,calculateDeliveryDate } from "../../data/deliverOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){

let cartSummaryHtml = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHtml += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" 
                data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary"
                data-product-id="${matchingProduct.id}">
                Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity" 
                data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingProduct,cartItem)}
            </div>
        </div>
    </div>
    `;
});


function deliveryOptionsHtml(matchingProduct,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption) => {
     
     const dateString = calculateDeliveryDate(deliveryOption);
     
     const priceString = deliveryOption.priceCents === 0
     ?'FREE'
     :`$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

     html+= `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
          <div>
          <div class="delivery-option-date">
              ${dateString}
          </div>
          <div class="delivery-option-price">
              ${priceString} Shipping
          </div>
          </div>
      </div>
     `;
  });
  return html;
}

document.querySelector('.js-order-summary')
 .innerHTML=cartSummaryHtml;

 document.querySelectorAll('.js-delete-quantity')
  .forEach((link) => {
    link.addEventListener('click',() =>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })
  });
  
document.querySelectorAll('.js-update-link')
 .forEach((link) =>{
    link.addEventListener('click',() =>{
       const {productId} = link.dataset;
       const container =document.querySelector(`.js-cart-item-container-${productId}`);
       container.classList.add('is-editing-quantity');
    })
 });

document.querySelectorAll('.save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);


      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }

      updateQuantity(productId, newQuantity);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });

    // Add this once outside the click handler
    const { productId } = link.dataset;
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    quantityInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const newQuantity = Number(quantityInput.value);
        if (newQuantity < 0 || newQuantity >= 1000) {
          alert('Quantity must be at least 0 and less than 1000');
          return;
        }
        updateQuantity(productId, newQuantity);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      }
    });
  });


 document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
     element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
     });
  });
}

