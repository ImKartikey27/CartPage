document.addEventListener("DOMContentLoaded",() => {
  const products =[
    {id:1, name:"Product-1", price:29.99},
    {id:2, name:"Product-2", price:19.999},
    {id:3, name:"Product-3", price:59.99}
  ]
  let cart = JSON.parse(localStorage.getItem("cartItems")) || []

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  renderCart();

  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product")
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}"> Add to cart</button>`
    productList.appendChild(productDiv);
  })

  productList.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON"){
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  })

  function addToCart(product){
    cart.push(product);
    setCart();
    renderCart()
  }

  function renderCart(){
    cartItems.innerHTML = ""
    let totalprice = 0;

    if(cart.length >0){
        emptyCartMsg.classList.add("hidden")
        cartTotal.classList.remove("hidden")
        cart.forEach((item, index) =>{
          totalprice += item.price
          const cartItem = document.createElement("div")
          cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
          `
          cartItems.appendChild(cartItem);
        })
    }
    else{
      emptyCartMsg.classList.remove("hidden")
      totalprice = 0
    }
    
  totalPrice.textContent = `$${totalprice.toFixed(2)}`

  }
  checkoutButton.addEventListener("click", () => {
    cart.length = 0;
    setCart();
    alert("Checked Out Successfully");
    renderCart();
  })

  function setCart(){
    localStorage.setItem("cartItems",JSON.stringify(cart));
  }
})