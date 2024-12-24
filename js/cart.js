$(function () {
  shopping_cart();
});

// 定義全局的 shopping_cart 函式
window.shopping_cart = function() {
  let cart = [];
  try {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
      console.error("Invalid cart data in localStorage:", error);
  }

  var totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0) || "0";
  if(totalQuantity>99){
    totalQuantity=99+"+";
  }
  $("#cart_app").html(`
      <a href="cart.html">
          <div class="floating-cart-button">
              <i class="fa-solid fa-cart-shopping"></i>
              <div class="cart-badge" id="cart_quantity">${totalQuantity}</div>
          </div>
      </a>
  `);
};
