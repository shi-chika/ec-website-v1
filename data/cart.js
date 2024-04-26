
export let cart = JSON.parse(localStorage.getItem("cart")) ;

if (!cart){
   cart = [];
};
// export let cart = [
//     {
//         id : "a003",
//         num:1
//     },
//     {
//         id : "a004",
//         num:2
//     },
//     {
//         id : "a006",
//         num:3
//     }
// ];


function saveStorage (){
    localStorage.setItem("cart", JSON.stringify(cart));
}


//*商品加到購物車陣列
export function addToCart(btn, buyNum = 1){
        let alreadyInCart = false;

        cart.forEach((cartItem) => {
            if( btn.dataset.productId === cartItem.id ){
                cartItem.num += buyNum;
                alreadyInCart = true;
            }
        });

        if(!alreadyInCart){
            cart.push({
                id: btn.dataset.productId,
                num: buyNum,
                deliveryId: "1"
            });  
        }
        // console.log(cart);
        saveStorage ();
    }

//*計算購物車內商品總數
export function countCartItem(){
        let cartNum = 0;
        cart.forEach((item) => {
            cartNum = cartNum + item.num
        })
        return cartNum;
    }

//*要刪除的商品 不加到新陣列 
export function deleteFromCart(delProductId){
    const newCart = [];
    cart.forEach((item)=> {
        if( item.id !== delProductId){
            newCart.push(item);
        }
    })
    cart = newCart;

    saveStorage ();
}    

//*更新運送方式
export function updateOption(productId, deliveryId){
    cart.forEach((cartItem)=>{
        if (cartItem.id === productId ){
            cartItem.deliveryId = deliveryId;
        }
    });
    saveStorage ();
   
}

//*更新商品數量
export function updateNum(productId, productNum){
    cart.forEach((cartItem)=>{
        if (cartItem.id === productId ){
            cartItem.num = productNum;
        }
    });
    saveStorage ();
   
}