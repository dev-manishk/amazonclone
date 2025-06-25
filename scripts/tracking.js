import { orders } from "../data/orders.js";
import { getProduct,loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



async function loadPage() {
  await loadProductsFetch();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

  let arriveQuantity;
  let matchingProduct;
  let trackingHtml = '';
  let ordertime;

  orders.forEach((object) =>{
  const products = object.products;
  ordertime = object.orderTime;
   
  products.forEach((product)=>{
    if(productId === product.productId){
         arriveQuantity = product;
    }
  });

 });

  matchingProduct = getProduct(arriveQuantity.productId);
  const dateString = dayjs(arriveQuantity.estimatedDeliveryTime).format('dddd, MMMM D');

  const today = dayjs();
  const orderTime = dayjs(ordertime);
  const deliveryTime = dayjs(arriveQuantity.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  // Extra feature: display "delivered" on the tracking page
  // if today's date is past the delivery date.
  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

  trackingHtml +=`
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveredMessage} ${
            dayjs(arriveQuantity.estimatedDeliveryTime).format('dddd, MMMM D')
          }
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${arriveQuantity.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
           <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress >= 100 ? "current-status" : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
      </div>
  `;

document.querySelector('.js-main')
 .innerHTML= trackingHtml;

}
loadPage();
