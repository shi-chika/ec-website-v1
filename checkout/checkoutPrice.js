import { cart } from "../data/cart.js";
import { products } from "../data/product.js";
import { getDetaildelivery } from "../data/deliveryOptions.js";

export function renderCheckoutPrice(){
let productNum = 0;
let productPrice = 0;
let deliveryPrice = 0;
let totalPrice = 0;
cart.forEach( (cartItem) => {
    const deliveryId = cartItem.deliveryId;
    const detailDelivery = getDetaildelivery(deliveryId);
    deliveryPrice += detailDelivery.price;

    let getDetail
    products.forEach((productItem) =>{
        if (cartItem.id === productItem.id){
            getDetail = productItem;
        }
    });
    productNum += cartItem.num
    productPrice += getDetail.discountPrice*cartItem.num
});
totalPrice = productPrice + deliveryPrice
const html = `  <h2 class="checkout-summary">注文詳細</h2>
                <p class="checkout-items">アイテム数 : ${productNum}</p>
                <p class="items-price">
                    <span>商品の小計 : </span>
                    <span>¥${productPrice}</span>
                </p>
                <p class="delivery-price">
                    <span>配送料 : </span>
                    <span>¥ ${deliveryPrice}</span>
                </p>
                <hr class="checkout-summary-hr">
                <p class="total-price">
                    <span>合計 : </span>
                    <span>¥${totalPrice} <span class="includingTax">税込</span></span>
                </p>
                <button class="checkout-button">レジへ進む</button>`;
        document.querySelector(".checkout-right").innerHTML = html;        
}