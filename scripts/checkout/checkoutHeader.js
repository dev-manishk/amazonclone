import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    
    const checkoutHTML =`
    Checkout (<a class="return-to-home-link js-checkout-link"
            href="amazon.html">${calculateCartQuantity()} items</a>)
    `;

    document.querySelector('.js-checkout-header-middle-section')
     .innerHTML=checkoutHTML;
}