import { renderHeader } from "./header.js";
import { searchProduct } from "../data/product.js";
import { addToCart } from "../data/cart.js";
import { showSuccess } from "./home.js";


renderHeader();

const params = new URLSearchParams(location.search);
console.log(params.get("search"));

const getSearchProduct = searchProduct(params.get("search"));

//*將商品陣列生成 html
let html = "";
getSearchProduct.forEach((item)=>{
    html += `
        <div class="product-block">
            <a href="product.html#${item.id}">
                <div class="product-image-row">
                    <img class="product-image" src="${item.img}">
                    ${item.discount ? '<p class="product-discount">'+ item.discount + 'OFF</p>' : ""}
                    
                </div>
                <div class="product-information">
                    <div class="product-text">
                        <p class="product-name">${item.name}</p>
                        <div class="add-success success-id-${item.id}">
                            <i class="check-icon fa-solid fa-check"></i>
                            <p class="add-success-p">カートに追加されました</p>
                        </div>
                        <div class="product-price-row">
                            <div class="product-price">
                                <p class="discount-price">¥ ${item.discountPrice} <span class="includingTax">税込</span></p>
                                <p class="origin-price">
                                ${item.originPrice ? "¥" + item.originPrice : ""} </p>
                            </div>
                            
                            <div data-product-id=${item.id} class="add-to-cart"> <img src="images/icons/cart.png"></div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
})

document.querySelector(".product-grid").innerHTML = html;
document.querySelector(".search-resule").textContent = getSearchProduct.length;
document.querySelector(".user-input").textContent = params.get("search");

//*點擊購物車 

let cartBtns = document.querySelectorAll(".add-to-cart");

cartBtns.forEach( (btn) => {
    btn.addEventListener("click", (e) => {
        const projectId = btn.dataset.productId;
        e.preventDefault();
       
        addToCart(btn);

        //*計算總數
        renderHeader();
       
        showSuccess(projectId);
    })
})