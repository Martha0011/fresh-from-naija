function toggleMenu() {
    const navLinks = document.getElementById('nav-links');  
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }   
}   
function filterProducts() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const products = document.querySelectorAll('#productList .product');
    let matchFound = false;
  
    products.forEach(product => {
      const name = product.textContent.toLowerCase();
      if (name.includes(input) && input !== '') {
        matchFound = true;
        const regex = new RegExp(`(${input})`, 'gi');
        product.innerHTML = product.textContent.replace(regex, '<span class="highlight">$1</span>');
        product.style.display = 'block';
      } else if (input === '') {
        product.innerHTML = product.textContent;
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  
    document.getElementById('noResults').style.display = matchFound ? 'none' : 'block';
  }
function clearSearch() {
    document.getElementById('searchBar').value = '';
    filterProducts();     
  }
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}
function addToCart(productName, price) {
    alert(productName + " has been added to your cart at $" + price);
    const cartItems = document.getElementById('cart-items');
    const item = document.createElement('div');
    item.innerText = productName + " - $" + price.toFixed(2);
    cartItems.appendChild(item);
}
const cartCountElement = document.getElementById('cart-count');
let cartCount = 0;
function updateCartCount() {
    cartCount++;
    cartCountElement.querySelector('span').innerText = cartCount;
}
let cartTotal = 0;
function updateCartTotal(price) {
    cartTotal += price;
    document.getElementById('cart-total').innerText = cartTotal.toFixed(2);
}
function showCartMessage() {
    const messageBox = document.getElementById('cartMessage');
    const cartCount = parseInt(cartCountElement.querySelector('span').innerText);
    if (cartCount === 0) {
        messageBox.textContent = "Your cart is empty!";
        messageBox.style.display = "block";
        messageBox.style.backgroundColor = "red";   
        setTimeout(() => { messageBox.style.display = "none"; }, 3000);
    } else {
        messageBox.textContent = "You have " + cartCount + " items in your cart totaling $" + cartTotal.toFixed(2);
        messageBox.style.display = "block";
        messageBox.style.backgroundColor = "green";
        setTimeout(() => { messageBox.style.display = "none"; }, 5000);
    }
}
function checkout() {
    const cartCount = parseInt(cartCountElement.querySelector('span').innerText);
    if (cartCount === 0) {
        alert("Your cart is empty! Please add items before checking out.");
    } else {
        alert("Thank you for your purchase of " + cartCount + " items totaling $" + cartTotal.toFixed(2) + "!");
        cartCount = 0;
        cartTotal = 0;
        cartCountElement.querySelector('span').innerText = cartCount;
        document.getElementById('cart-total').innerText = cartTotal.toFixed(2);
        document.getElementById('cart-items').innerHTML = '';
    }}
function messageBox() {
    displayMessage("Item added to cart!");
}
function displayMessage(msg) {
    const messageBox = document.getElementById('cartMessage');
    messageBox.innerText = msg;
    messageBox.style.display = 'block';
    setTimeout(() => { messageBox.style.display = 'none'; }, 3000);
}
function displayMessage() {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerText = "Item added to cart!";
    messageBox.style.display = 'block'; 
    setTimeout(() => { messageBox.style.display = 'none'; }, 3000);
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(productName, price);
        updateCartCount();
        updateCartTotal(price);
    });
});

document.getElementById('checkout-btn').addEventListener('click', checkout);
