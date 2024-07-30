// Sample product data
const products = [
    { id: 1, name: "Paneer Butter Masala", price: 499, image: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-5.jpg", description: "A rich and creamy curry made with paneer and a buttery tomato sauce." },
    { id: 2, name: "Vegetable Biryani", price: 649, image: "https://c.ndtvimg.com/2023-11/ip3f5g7o_biryani_625x300_17_November_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886", description: "Aromatic basmati rice cooked with fresh vegetables and spices." },
    { id: 3, name: "Chole Bhature", price: 299, image: "https://static.toiimg.com/photo/98230357.cms", description: "Spicy chickpea curry served with fluffy fried bread." },
    { id: 4, name: "Chowmein", price: 299, image: "https://images.getrecipekit.com/20221130023757-untitled-design-12-3.png?aspect_ratio=16:9&quality=90&", description: "Stir-fried noodles with vegetables and spices." },
    { id: 5, name: "Naan", price: 149, image: "https://foodess.com/wp-content/uploads/2023/02/Butter-Naan-3.jpg", description: "Soft and buttery Indian flatbread." }
];

// Function to load products
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>₹${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
        productGrid.appendChild(productDiv);
    });
}

// Cart management
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartCount();
    loadCartItems();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart a');
    cartCount.textContent = `Cart (${cart.length})`;
}

function loadCartItems() {
    const cartItems = document.querySelector('.cart-items tbody');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${item.product.image}" alt="${item.product.name}"> ${item.product.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.product.price.toFixed(2)}</td>
            <td>₹${itemTotal.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeFromCart(${item.product.id})">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartCount();
    loadCartItems();
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function checkout() {
    alert('Proceeding to checkout');
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', loadProducts);