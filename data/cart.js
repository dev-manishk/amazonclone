export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryOptionId:'1'
  },{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  }];
}

function getCart(productId){
  let matchingItem;

    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
       matchingItem = cartItem;
      }
    }); 
  return matchingItem;
}

export function updateQuantity(productId,newQuantity){
    const matchingItem = getCart(productId);
    matchingItem.quantity = newQuantity;
    const quantity = calculateCartQuantity();
    
    saveToStorage();
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId,selectorValue){
      const matchingItem = getCart(productId);
      if(matchingItem){
        matchingItem.quantity++;
      }else{
        cart.push({
          productId,
          quantity:selectorValue,
          deliveryOptionId:'1'
        });
      }
      saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(productId!==cartItem.productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity=0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId){
  const matchingItem = getCart(productId)

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const result = await response.text();
  console.log(result);
}

export function resetCart() {
  cart = [];
  saveToStorage();
}