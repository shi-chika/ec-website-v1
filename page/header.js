import { countCartItem } from "../data/cart.js";

export function renderHeader(){
    const headerHtml = `
    <div class="header-container">
        <div class="header-left">
            <a href="index.html">
                <div class="header-title">
                    <p><span>O</span>NLINE </p>
                    <p><span>S</span>HOP</p>
                </div>
                
            </a>
        </div>

        <div class="header-right">
            <div class="search">
                <input class="search-input" placeholder="商品を探す">
                <button class="search-button">
                    <img class="search-icon" src="images/icons/search.svg">
                </button>
            </div>
            <div class="cart">
                <a href="checkout.html">
                    <img class="cart-icon" src="images/icons/cart.png">
                </a>
                <p class="cart-num">${countCartItem()}</p>
            </div>
        </div>
    </div>`
    document.querySelector('.header').innerHTML = headerHtml;    


    document.querySelector(".search-button").addEventListener("click", ()=>{
        const searchText = document.querySelector(".search-input").value;
        location.href = `/search.html?search=${searchText}`;
    })
};


