import  { renderCheckoutOrder } from "../checkout/checkoutOrder.js";
import  { renderCheckoutPrice } from "../checkout/checkoutPrice.js";
import { renderHeader } from "./header.js";

window.addEventListener('scroll', function() {
    const homeTop = document.querySelector('.homeTopBtn');
    if (window.scrollY > 100) {
      homeTop.style.display = "block"
     
    } else {
      homeTop.style.display = "none"
     
    }
  });
renderHeader();

renderCheckoutOrder();

renderCheckoutPrice();