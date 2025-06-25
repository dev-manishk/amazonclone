import { orders } from "../data/orders.js";
import { getProduct,loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./util/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addtocart } from "../data/cart.js";


let orderHtml = '';
async function loadPage() {
  await loadProductsFetch();//important line
  
    orders.forEach((object) =>{
    const products = object.products;
    const orderTimeString = dayjs(object.orderTime).format('MMMM D');
    orderHtml +=`
    <div class="order-container">
        
        <div class="order-header">
            <div class="order-header-left-section">
            <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(object.totalCostCents)}</div>
            </div>
            </div>

            <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${object.id}</div>
            </div>
        </div>
        <div class="order-details-grid">
        ${orderList(products)}
        </div>
    </div>
    `;

    function orderList(products){
        let orderListHtml = '';
        products.forEach((product) => {
        const productDetail = getProduct(product.productId);
        

        orderListHtml +=  `
            <div class="product-image-container">
            <img src="${productDetail.image}">
            </div>

            <div class="product-details">
            <div class="product-name">
                ${productDetail.name}
            </div>
            <div class="product-delivery-date">
                Arriving on: ${
              dayjs(product.estimatedDeliveryTime).format('MMMM D')
            }
            </div>
            <div class="product-quantity">
                Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary" data-product-id="${productDetail.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
            </div>

            <div class="product-actions">
            <a href="tracking.html?oderId=${object.id}&productId=${productDetail.id}">
                <button class="track-package-button button-secondary">
                Track package
                </button>
            </a>
            </div>
        `;
        });
        return orderListHtml;
    }
    });

    
document.querySelector('.js-orders-grid')
 .innerHTML=orderHtml;

 document.querySelectorAll('.button-primary')
  .forEach((button)=>{
    button.addEventListener('click',() =>{
    const productId = button.dataset.productId;
    addtocart(productId,1);

    button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });

  });
}

loadPage();





