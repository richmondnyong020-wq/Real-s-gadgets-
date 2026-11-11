
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. CREATE THE FLOATING SUPPORT BUTTON
    // =====================================

    const chatButton = document.createElement("a");
chatButton.id = "rg-chat-button";
chatButton.href = "support.html";
chatButton.style.textDecoration = "none";
chatButton.style.boxSizing = "border-box";
    chatButton.innerHTML = `
    <svg viewBox="0 0 24 24" width="36" height="36"
        fill="none" stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M3 13v-2a9 9 0 0 1 18 0v2"/>
        <path d="M5 12H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v-7H5Z"/>
        <path d="M19 12h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3v-7h2Z"/>
        <path d="M17 19a5 5 0 0 1-5 3h-1"/>
    </svg>
`;

    chatButton.setAttribute(
        "aria-label",
        "Open Reals Gadgets customer support"
    );

    document.body.appendChild(chatButton);


    // =====================================
    // 2. CREATE THE CHAT INTERFACE
    // =====================================

    const chatBox = document.createElement("div");

    chatBox.id = "rg-chat-box";

    chatBox.innerHTML = `
        <div class="rg-chat-header">
            <div>
                <strong>Reals Gadgets Support</strong>
                <small>Automated Customer Assistant</small>
            </div>
            <button type="button" id="rg-chat-close">×</button>
        </div>

        <div id="rg-chat-messages" aria-live="polite">
            <div class="rg-message rg-bot">
                Hey there! 👋 Welcome to Reals Gadgets.
                I'm your Reals Gadgets Assistant.
                I'm here to help you with products, orders,
                payments and enquiries. What can I help you with today?
            </div>
        </div>

        <div class="rg-quick-actions">
            <button type="button" data-message="How do I place an order?">How to order</button>
            <button type="button" data-message="What payment methods do you accept?">Payment</button>
            <button type="button" data-message="I want to shop for smartphones">Shop phones</button>
            <button type="button" data-message="I want to speak to a human">Contact support</button>
        </div>

        <form id="rg-chat-form">
            <input
                type="text"
                id="rg-chat-input"
                placeholder="Type your message..."
                autocomplete="off"
                required
            >
            <button type="submit">➤</button>
        </form>
    `;


    // =====================================
    // 3. PLACE CHAT IN THE CORRECT LOCATION
    // =====================================

    const isSupportPage =
        document.body.classList.contains("support-page");

    const supportArea =
        document.querySelector(".support-chat-area");

    if (isSupportPage && supportArea) {

        // Hide the floating button on the support page
        chatButton.style.display = "none";

        // Open the chat automatically
        chatBox.classList.add("rg-chat-visible");

        // Make the chat fill the support panel
        chatBox.style.cssText += `
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 570px !important;
            max-height: none !important;
            margin: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            display: flex !important;
        `;

        // Put the chat inside the support page
        supportArea.appendChild(chatBox);

        // Hide the duplicate chat heading
        const header = chatBox.querySelector(".rg-chat-header");

        if (header) {
            header.style.display = "none";
        }

    } else {

        // Show the floating chat on other website pages
        document.body.appendChild(chatBox);

    }


    // =====================================
    // 4. HOMEPAGE AND CONTACT PAGE REDIRECT
    // =====================================




    // =====================================
    // 5. GET CHAT ELEMENTS
    // =====================================

    const messages =
        chatBox.querySelector("#rg-chat-messages");

    const chatInput =
        chatBox.querySelector("#rg-chat-input");

    const chatForm =
        chatBox.querySelector("#rg-chat-form");

    const closeButton =
        chatBox.querySelector("#rg-chat-close");


    // =====================================
    // 6. CLOSE BUTTON FOR FLOATING CHAT
    // =====================================

    if (closeButton) {

        closeButton.addEventListener("click", function () {

            chatBox.classList.remove("rg-chat-visible");

            chatButton.style.display = "flex";

        });

    }


    // =====================================
    // 7. DISPLAY CHAT MESSAGES
    // =====================================

    function addMessage(text, sender, linkText, linkUrl) {

        const message = document.createElement("div");

        message.className = "rg-message " + sender;

        message.textContent = text;

        if (linkText && linkUrl) {

            const link = document.createElement("a");

            link.href = linkUrl;
            link.textContent = linkText;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            message.appendChild(document.createElement("br"));
            message.appendChild(link);

        }

        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;

    }


    // =====================================
    // 8. AUTOMATED CUSTOMER SUPPORT ANSWERS
    // =====================================

    function getBotReply(message) {

        const msg = message.toLowerCase();

        if (/hello|hi\b|hey|good morning|good afternoon|good evening/.test(msg)) {
            return {
                text: "Hello! 😊 Welcome to Reals Gadgets. How can I help you today?"
            };
        }

        if (/smartphone|smartphones|iphone|samsung|phone/.test(msg)) {
            return {
                text: "You can explore our smartphone collection here:",
                linkText: "View Smartphones",
                linkUrl: "smartphones.html"
            };
        }

        if (/laptop|computer/.test(msg)) {
            return {
                text: "Thanks for your interest in laptops! Please contact our support team to confirm the available models and prices.",
                linkText: "Chat with us on WhatsApp",
                linkUrl: "https://wa.me/2349123053184"
            };
        }

        if (/watch|smartwatch/.test(msg)) {
            return {
                text: "You can find our smartwatch listings in the Featured Products section on our homepage.",
                linkText: "View Featured Products",
                linkUrl: "index.html#products"
            };
        }

        if (/accessor|earbud|headphone|charger/.test(msg)) {
            return {
                text: "We have accessories listed among our featured products. Please check the homepage or contact us for availability.",
                linkText: "View Products",
                linkUrl: "index.html#products"
            };
        }

        if (/order|buy|purchase|checkout|cart/.test(msg)) {
            return {
                text: "To place an order, browse our products, tap Add to Cart, open your cart and continue to checkout. Online payment is not yet connected, so please contact us to confirm and complete your order.",
                linkText: "Contact us on WhatsApp",
                linkUrl: "https://wa.me/2349123053184"
            };
        }

        if (/payment|paystack|transfer|bank|card/.test(msg)) {
            return {
                text: "Our online payment gateway is not yet connected. Please contact us directly to confirm the approved payment method before making any payment.",
                linkText: "Ask us on WhatsApp",
                linkUrl: "https://wa.me/2349123053184"
            };
        }

        if (/deliver|shipping|dispatch|location|address/.test(msg)) {
            return {
                text: "Delivery availability, fees and estimated delivery times depend on your location. Please send us your location so our team can confirm the details.",
                linkText: "Ask about delivery",
                linkUrl: "https://wa.me/2349123053184"
            };
        }

        if (/price|cost|how much|available|stock|in stock/.test(msg)) {
            return {
                text: "Product prices are displayed on our website. Availability and current prices should be confirmed with our team before ordering.",
                linkText: "Confirm with WhatsApp",
                linkUrl: "https://wa.me/2349123053184"
            };
        }

        if (/return|refund|exchange|damaged|faulty/.test(msg)) {
            return {
                text: "Our support team will need to review your enquiry and explain the applicable return or refund terms.",
                linkText: "Contact customer support",
                linkUrl: "https://wa.me/2349123053184"
            };
        }

        if (/contact|human|person|agent|support|whatsapp/.test(msg)) {
            return {
                text: "Of course! You can speak directly with the Reals Gadgets team here:",
                linkText: "Chat with us on WhatsApp",
                linkUrl: "https://wa.me/2349123053184"
            };
        }

        if (/thank|thanks/.test(msg)) {
            return {
                text: "You're very welcome! 😊 Thank you for choosing Reals Gadgets."
            };
        }

        if (/bye|goodbye/.test(msg)) {
            return {
                text: "Thank you for visiting Reals Gadgets. We hope to serve you soon! 👋"
            };
        }

        return {
            text: "I'm sorry, I don't have an answer for that yet. Our support team can help you directly.",
            linkText: "Chat with us on WhatsApp",
            linkUrl: "https://wa.me/2349123053184"
        };

    }


    // =====================================
    // 9. SEND CUSTOMER MESSAGE
    // =====================================

    function sendMessage(message) {

        if (!message.trim()) return;

        addMessage(message, "rg-user");

        const reply = getBotReply(message);

        setTimeout(function () {

            addMessage(
                reply.text,
                "rg-bot",
                reply.linkText,
                reply.linkUrl
            );

        }, 400);

    }


    // =====================================
    // 10. HANDLE MESSAGE FORM
    // =====================================

    chatForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) return;

        sendMessage(message);

        chatInput.value = "";

    });


    // =====================================
    // 11. QUICK REPLY BUTTONS
    // =====================================

    chatBox.querySelectorAll(".rg-quick-actions button").forEach(function (button) {

        button.addEventListener("click", function () {

            sendMessage(button.dataset.message);

        });

    });

});
