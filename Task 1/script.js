const cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu-container');
  const cartContainer = document.getElementById('cart-container');
  const checkoutForm = document.getElementById('checkout-form');

  if (menuContainer) {
    fetch('data/menu.json')
      .then(res => res.json())
      .then(data => {
        displayMenu(data);
      });
  }

  if (cartContainer) displayCart();

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    });
  }
});

function displayMenu(items) {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="assets/images/${item.image}" width="150">
      <h2>${item.name}</h2>
      <p>₹${item.price}</p>
      <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
    `;
    menuContainer.appendChild(div);
  });
}

function addToCart(item) {
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}

function displayCart() {
  const cartContainer = document.getElementById('cart-container');
  const totalElem = document.getElementById('cart-total');
  let total = 0;
  cartContainer.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <h2>${item.name}</h2>
      <p>₹${item.price}</p>
    `;
    total += item.price;
    cartContainer.appendChild(div);
  });
  totalElem.textContent = total;
}

<!-- tastybite-pro/data/menu.json -->
[
  { "name": "Cheese Burger", "price": 120, "image": "burger.jpg" },
  { "name": "Veg Pizza", "price": 180, "image": "pizza.jpg" },
  { "name": "Fried Momos", "price": 100, "image": "momos.jpg" },
  { "name": "Cold Coffee", "price": 80, "image": "coffee.jpg" }
]
