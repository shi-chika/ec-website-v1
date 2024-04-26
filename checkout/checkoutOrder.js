import { cart, deleteFromCart, updateOption, updateNum } from "../data/cart.js";
import { products } from "../data/product.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { renderCheckoutPrice } from "./checkoutPrice.js";
import { renderHeader } from "../page/header.js";


export function renderCheckoutOrder(){
    //*根據陣列生成運送方式
    function addDeliveryOption(cartItemId, deliveryId){
        let html = "";
        deliveryOptions.forEach((option)=>{
            html += 
            `
            <div class="delivery-option">
                <input 
                ${option.id === deliveryId ? "checked" :""}
                type="radio"  
                class="delivery-option-input" 
                name="delivery-option-${cartItemId}"
                data-product-id = ${cartItemId}
                data-delivery-id= ${option.id}
                >
                <p class="delivery-option-name">${option.name}</p>
                <p class="delivery-option-price">¥ ${option.price}</p>
            </div>`
        });
        return html;
    }


    let cartListHtml ="";

    cart.forEach((cartItem) =>{
        
        let getDetail
        products.forEach((productItem) =>{
            if (cartItem.id === productItem.id){
                getDetail = productItem;
            }
        })
        // console.log(getDetail);
        cartListHtml +=`
                <div  class="product-row js-project-id-${ getDetail.id}">
                    <img class="product-image" src="${ getDetail.img }" />
                    <div class="product-information">
                        <p class="product-name">${ getDetail.name }</p>
                        <div class="product-detail">
                            <div class="product-detail-left">
                                <div class="product-price">
                                ${ getDetail.originPrice ? '<p class="origin-price">¥ '+ getDetail.originPrice  +'</p>' : ""}
                                    
                                    <p class="discount-price">¥ ${ getDetail.discountPrice } <span class="includingTax">税込</span></p>
                                </div>
                                <div class="buy-num-row">
                                    <p class="num-p">数量</p>
                                    <input 
                                    data-product-id= ${getDetail.id}  
                                    class="buy-num" 
                                    value="${cartItem.num}">
                                </div>
                            </div>
                            <div class="product-detail-right">
                                <button data-product-id= ${getDetail.id} class="delete-from-cart">削除</button>
                            </div>
                            </div>
                        <hr class="product-information-hr">
                        <div class="delivery-options">
                            <p class="delivery-option-p">配達方法</p>

                            ${addDeliveryOption(getDetail.id, cartItem.deliveryId)}
                        
                        </div>             
                    </div>
                </div>`
        })  

    //*生成商品HTML
    document.querySelector(".checkout-left").innerHTML = cartListHtml;    


    //*點擊刪除按鈕
    document.querySelectorAll(".delete-from-cart").forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            const delProductId = btn.dataset.productId;
            //陣列中刪除商品
            deleteFromCart(delProductId);
            // console.log(cart);
            //頁面中刪除商品
            // document.querySelector(`.js-project-id-${ delProductId} `).remove();
            e.target.closest('.product-row').remove();
            //*重新渲染右邊計算頁面
            renderCheckoutPrice();
            //*更新右上商品數量
            renderHeader();
        })
    })

    //*修改運送方式 就更新到購物車陣列裡
    document.querySelectorAll(".delivery-option-input").forEach((input)=>{
        input.addEventListener("click", ()=>{
            const productId = input.dataset.productId;
            const deliveryId = input.dataset.deliveryId;
            
            updateOption(productId, deliveryId );
            // console.log(input.dataset);
            renderCheckoutPrice();
        })
    })

    //*修改商品數量 就更新到購物車陣列裡
    document.querySelectorAll(".buy-num").forEach((input)=>{
        input.addEventListener("change",()=>{
            const productId = input.dataset.productId;
            const productNum = Number(input.value);

            updateNum(productId, productNum)
            renderCheckoutPrice();
            renderHeader();
        })
    })

    console.log(cart);
}

