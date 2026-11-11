/* =====================================
   REALS GADGETS
   SHOPPING CART & CHECKOUT SYSTEM
===================================== */

// CART DATA
let cart = JSON.parse(
    localStorage.getItem("realsGadgetsCart") || "[]"
);

// CURRENCY FORMAT
function formatPrice(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
}

// SAVE CART
function saveCart() {
    localStorage.setItem(
        "realsGadgetsCart",
        JSON.stringify(cart)
    );
}

// ADD PRODUCT TO CART
function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });
    }

    saveCart();
    displayCart();

    alert(name + " added to your cart!");
}

// DISPLAY CART
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems || !cartTotal || !cartCount) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.textContent = "Your cart is currently empty.";

    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        totalQuantity += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent =
            formatPrice(item.price) +
            " × " + item.quantity;

        details.appendChild(name);
        details.appendChild(price);

        const actions = document.createElement("div");

        const subtotal = document.createElement("strong");
        subtotal.textContent = formatPrice(itemTotal);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.style.marginLeft = "10px";
        removeButton.style.color = "red";

        removeButton.onclick = function () {
            removeFromCart(index);
        };

        actions.appendChild(subtotal);
        actions.appendChild(removeButton);

        row.appendChild(details);
        row.appendChild(actions);

        cartItems.appendChild(row);

    });

    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = totalQuantity;

}

// REMOVE PRODUCT
function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    displayCart();

}

// CLEAR CART
function clearCart() {

    cart = [];

    saveCart();
    displayCart();

}

// GET CART TOTAL
function getCartTotal() {

    return cart.reduce(
        (total, item) => {
            return total + item.price * item.quantity;
        },
        0
    );

}

// CHECKOUT FORM
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Your shopping cart is empty. Please add a product first.");

            return;

        }

        const customer = {

            name: document.getElementById("customer-name").value.trim(),

            email: document.getElementById("customer-email").value.trim(),

            phone: document.getElementById("customer-phone").value.trim(),

            address: document.getElementById("customer-address").value.trim(),

            state: document.getElementById("customer-state").value

        };

        const order = {

            orderNumber: "RG-" + Date.now(),

            customer: customer,

            products: cart.map(item => ({ ...item })),

            total: getCartTotal(),

            date: new Date().toLocaleString()

        };

        // FRONT-END DEMO ONLY
        // Payment and email are not yet connected.

        alert(
            "Thank you, " + customer.name + "!\n\n" +

            "Your order has been prepared.\n\n" +

            "Order Number: " + order.orderNumber + "\n" +

            "Total: " + formatPrice(order.total) + "\n\n" +

            "The payment gateway will be connected next."
        );

        console.log("Prepared order:", order);

    });

}

// INITIALIZE WEBSITE
document.addEventListener("DOMContentLoaded", function() {

    displayCart();

    console.log("REALS GADGETS website is ready!");

});
