import { products } from "../data/product.js";
import { addToCart } from "../data/cart.js";
import { renderHeader } from "./header.js";

window.addEventListener('scroll', function() {
    const homeTop = document.querySelector('.homeTopBtn');
    if (window.scrollY > 100) {
      homeTop.style.display = "block"
     
    } else {
      homeTop.style.display = "none"
     
    }
  });

//*商品數量渲染在頁面上
renderHeader();


//*將商品陣列生成 html
let html = "";
products.forEach((item)=>{
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
                            <div data-product-id=${item.id} class="add-to-cart"> <img  src="images/icons/cart.png"></div>
                           
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
})

document.querySelector(".product-grid").innerHTML = html;

//*點擊購物車 

let cartBtns = document.querySelectorAll(".add-to-cart");

cartBtns.forEach( (btn) => {
    btn.addEventListener("click", (e) => {
        const projectId = btn.dataset.productId;
        e.preventDefault();
       
        addToCart(btn);

        //*計算總數
        renderHeader();
        // let getCartNum = countCartItem()
        // document.querySelector(".cart-num").textContent = getCartNum; 
        showSuccess(projectId);
    })

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const cart = document.querySelector('.cart');
       
        cart.classList.add('shake');
  
        setTimeout(() => {
          cart.classList.remove('shake');
        }, 600); 
    })

    btn.addEventListener("mouseover", (e) => {
        e.preventDefault();
        btn.style.opacity = "0.8"

    })
    btn.addEventListener("mouseout", (e) => {
        e.preventDefault();
        btn.style.opacity = "1"

    })
})





export function showSuccess(projectId){
    const successMsg = document.querySelector(`.success-id-${projectId}`);
    successMsg.classList.add("visible-element");
    setTimeout(()=>{
        successMsg.classList.remove("visible-element");
    },3000)
}  