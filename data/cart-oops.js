function Cart(localStorageKey){
    const cart ={
    cartItems : undefined,

    loadfromStorage (){
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));//cart-oop so that we dont affect the original cart;
        if(!this.cartItems){
            this.cartItems = [{
                productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:2,
                deliveryOptionId:'1'
            },{
                productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionId:'2'
            }];
        }
    },

    saveToStorage(){
    localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    getCart(productId){
    let matchingItem;

        this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
        matchingItem = cartItem;
        }
        }); 
    return matchingItem;
    },

    addtocart(productId,selectorValue){
        const matchingItem = this.getCart(productId);
        if(matchingItem){
            matchingItem.quantity++;
        }else{
            this.cartItems.push({
            productId,
            quantity:selectorValue,
            deliveryOptionId:'1'
            });
        }
        this.saveToStorage();
    },

    removeFromCart(productId){
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
        if(productId!==cartItem.productId){
        newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;
    this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId){
    const matchingItem = this.getCart(productId)

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
    },

    updateQuantity(productId,newQuantity){
        const matchingItem = this.getCart(productId);
        matchingItem.quantity = newQuantity;
        const quantity = calculateCartQuantity();
        
        this.saveToStorage();
    },

    calculateCartQuantity(){
    let cartQuantity=0;

    this.cartItems.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
    }

    };
 return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadfromStorage();
businessCart.loadfromStorage();

console.log(cart);
console.log(businessCart);













