import { products } from "../data/product.js";
import { renderHeader } from "./header.js";
import { addToCart } from "../data/cart.js";

renderHeader();

const getProductId = location.hash.substring(1);
let pdpHtml = "";

products.forEach((product)=>{
    let productInfo ="";
    if( getProductId === product.id ){
     productInfo = product;
     pdpHtml = `
     <div class="container">
            <div class="product-block">
                <div class="product-image"><img src="${productInfo.img}" /></div>
                
                 <div class="product-information">
                     <h1 class="product-name">${productInfo.name}</h1>
                     <div class="product-rating">
                         <p class="rating-count">${productInfo.stars}</p>
                         <img class="rating-stars" src="images/ratings/rating_${Math.round(product.stars/0.5)*5}.png">
                         <p class="comment-num">${productInfo.commentNum} 件のレビュー</p>
                     </div>
                     <div class="sell-information">
                         ${ productInfo.discount ? '<p class="product-discount">'+ productInfo.discount + 'OFF </p>' : ""}
                         
                         <p class="sell-num">販売数 ${productInfo.sellNum}</p>
                     </div>
                     <div class="product-price">
                     ${ productInfo.originPrice ? '<p class="origin-price">通常価格 ¥'+ productInfo.originPrice +'</p>' :''}
                         
                         <p class="discount-price">¥ ${productInfo.discountPrice} <span class="includingTax">税込</span></p>
                     </div>
                     
                     <div class="buy-num-row">
                         <p class="num-p">數量</p>
                         <select class="buy-num">
                             <option selected value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             <option value="6">6</option>
                             <option value="7">7</option>
                             <option value="8">8</option>
                             <option value="9">9</option>
                             <option value="10">10</option>
                         </select>
                     </div>
                     <button data-product-id=${productInfo.id}  class="add-to-cart">カートに入れる</button>
                     <div class="add-success ">
                        
                        <i class="check-icon fa-solid fa-check"></i>
                        <p class="add-success-p">カートに追加されました</p>
                     </div>
                 </div>
             </div>
             <div class="description-block">
                 <p class="description-p">商品説明</p>
                 <p class="product-description">
                     ${product.description} 
                 </p>
            </div>
    </div>`
    };

   
});
document.querySelector(".js-product-info").innerHTML = pdpHtml;


const addTocartBtn = document.querySelector(".add-to-cart");
addTocartBtn.addEventListener("click", () => {
    const buyNum =Number(document.querySelector('.buy-num').value) ;   
    addToCart(addTocartBtn, buyNum);

    //*計算總數
    renderHeader();
    showSuccess()

})

addTocartBtn.addEventListener("click", () => {
    const cart = document.querySelector('.cart');
    cart.classList.add('shake');

    setTimeout(() => {
      cart.classList.remove('shake');
    }, 600); 

})



function showSuccess(){
    const successMsg = document.querySelector('.add-success');
    successMsg.classList.add("visible-element");
    setTimeout(()=>{
        successMsg.classList.remove("visible-element");
    },3000)
}

window.addEventListener('scroll', function() {
    const homeTop = document.querySelector('.homeTopBtn');
    if (window.scrollY > 100) {
      homeTop.style.display = "block"
     
    } else {
      homeTop.style.display = "none"
     
    }
  });
