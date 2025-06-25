import { renderOrderSummary } from "./checkout/orderSummary.js";  
import { renderPaymentSummary } from "./checkout/paymentSummary.js";  
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practice.js';


async function loadPage(){
    try {
       
       await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
       ]);

        // const value = await new Promise((resolve,reject) => {
        //     //throw 'error2';
        //     loadCartFetch(() => {
        //         //reject('error3');
        //         resolve('value3');
        //     });
        // });
    } catch(error){
         console.log('Unexpected error. Please try again later');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}

loadPage();



/*
Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((value) =>{
    console.log(value);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() =>{
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() =>{
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});
*/




/*
loadProducts(() =>{   //callback
    loadCart(() =>{
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    });
});
*/
