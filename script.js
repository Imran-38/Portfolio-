/* ==========================================
   ১. মোবাইল নেভিগেশন মেনু ও টাইপিং ইফেক্ট
   ========================================== */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// টাইপিং এনিমেশন
const words = ["সেলস রিপ্রেজেন্টেটিভ", "বিজনেস ডেভেলপার", "কাস্টমার এক্সপার্ট"];
let i = 0;
let timer;

function typingEffect() {
    let typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            typingElement.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            typingElement.innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}
typingEffect();


/* ==========================================
   ২. ব্যাক টু টপ ও এফএকিউ একর্ডিয়ন
   ========================================== */
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});


/* ==========================================
   ৩. ই-কমার্স কার্ট ও মর্ডান চেকআউট সিস্টেম
   ========================================== */

// কার্ট ডেটা লোকালস্টোরেজ থেকে নেওয়া
function getCart() {
    return JSON.parse(localStorage.getItem('myCart')) || [];
}

// কার্ট সেভ করা ও ব্যাজ কাউন্ট আপডেট করা
function saveCart(cart) {
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.qty, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.innerText = count;
    }
}

// কাস্টম টোস্ট নোটিফিকেশন দেখানোর ফাংশন
function showToast(message, type = 'success') {
    const existingToast = document.getElementById('customToastMessage');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'customToastMessage';
    toast.innerText = message;

    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = type === 'exists' ? '#e67e22' : '#27ae60';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '6px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    toast.style.zIndex = '99999';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '600';
    toast.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// প্রোডাক্ট কার্টে যোগ করা
function addToCart(name, price) {
    let cart = getCart();
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        showToast(`⚠️ এই পছন্দের প্রোডাক্টটি ইতিমধ্যেই কার্টে আছে!`, 'exists');
    } else {
        cart.push({ name: name, price: Number(price), qty: 1 });
        saveCart(cart);
        showToast(`✅ সফলভাবে কার্টে যুক্ত হয়েছে: ${name}`, 'success');
        toggleCartModal();
    }
}

// কার্টের পণ্যের পরিমাণ বাড়ানো বা কমানো
function updateQuantity(index, change) {
    let cart = getCart();
    if (cart[index]) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
        renderCartAndCheckout();
    }
}

// কার্ট থেকে আইটেম ডিলিট করা
function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartAndCheckout();
}

// কার্ট পপ-আপ মোডাল ওপেন/ক্লোজ করা
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
            goToStep1(); // মোডাল খোলার সময় সর্বদা ১ম ধাপ দেখাবে
            renderCartAndCheckout();
        }
    }
}

// ধাপ ১ (কাস্টমার ডিটেইলস) থেকে ধাপ ২ (পেমেন্ট ও ডেলিভারি)
function goToStep2() {
    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const address = document.getElementById('custAddress')?.value.trim();

    if (!name || !phone || !address) {
        alert('অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা দিন।');
        return;
    }

    const step1 = document.getElementById('checkoutStep1');
    const step2 = document.getElementById('checkoutStep2');

    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';
}

function goToStep1() {
    const step1 = document.getElementById('checkoutStep1');
    const step2 = document.getElementById('checkoutStep2');

    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
}

// কার্টের আইটেমগুলো স্ক্রিনে রেন্ডার করা ও কাস্টমার ফর্ম ভিজিবল করা
function renderCartAndCheckout() {
    const container = document.getElementById('cartItemsContainer');
    const cartSummary = document.getElementById('cartSummary');
    const fullCheckout = document.getElementById('fullCheckoutArea');
    if (!container) return;

    let cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 30px 15px;">
                <p style="color: #666; font-size: 15px; margin-bottom: 6px;">আপনার কার্ট খালি আছে!</p>
                <p style="color: #0056b3; font-size: 14px; font-weight: 600; margin-bottom: 15px;">কার্ট লিস্টে প্রোডাক্ট অ্যাড করতে প্রোডাক্ট পেজে যান</p>
                <a href="products.html" style="display: inline-block; background-color: #0056b3; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                    <i class="fa-solid fa-box-open"></i> প্রোডাক্ট পেজে যান
                </a>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        if (fullCheckout) fullCheckout.style.display = 'none';
        return;
    }

    // প্রোডাক্ট থাকলে ফর্ম সেকশনটি দৃশ্যমান হবে
    if (cartSummary) cartSummary.style.display = 'block';
    if (fullCheckout) fullCheckout.style.display = 'block';

    let html = '';
    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        html += `
            <div class="cart-item-card" style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; margin-bottom: 10px; background: #fff;">
                <div class="cart-item-info">
                    <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #1e293b; font-weight: bold;">${item.name}</h4>
                    <span class="cart-item-price" style="font-size: 13px; color: #16a34a; font-weight: 600;">৳${item.price} × ${item.qty} = ৳${subtotal}</span>
                </div>
                <div class="cart-qty-ctrl" style="display: flex; align-items: center; gap: 6px;">
                    <button onclick="updateQuantity(${index}, -1)" style="padding: 2px 8px; border: 1px solid #cbd5e1; border-radius: 4px; background: #f1f5f9; cursor: pointer; font-weight: bold;">-</button>
                    <span style="font-size: 14px; font-weight: bold;">${item.qty}</span>
                    <button onclick="updateQuantity(${index}, 1)" style="padding: 2px 8px; border: 1px solid #cbd5e1; border-radius: 4px; background: #f1f5f9; cursor: pointer; font-weight: bold;">+</button>
                    <button class="btn-remove" onclick="removeItem(${index})" style="background: #fee2e2; border: none; color: #ef4444; padding: 6px 8px; border-radius: 4px; cursor: pointer; margin-left: 4px;"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    calculateFinalTotal();
}

// পেমেন্ট মেথড চেঞ্জ হলে মোবাইল ব্যাংকিং ফিল্ড দেখানো/লুকানো
function togglePaymentDetails() {
    const payMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!payMethod) return;
    
    const mbDetails = document.getElementById('mobileBankingDetails');
    if (payMethod.value === 'MobileBanking') {
        if (mbDetails) mbDetails.style.display = 'block';
    } else {
        if (mbDetails) mbDetails.style.display = 'none';
        const advInput = document.getElementById('advanceAmount');
        if (advInput) advInput.value = '';
    }
    calculateFinalTotal();
}

// সর্বমোট বিল, ডেলিভারি চার্জ, অগ্রিম ও বাকি টাকার হিসাব করা
function calculateFinalTotal() {
    let cart = getCart();
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    let selectedDelivery = document.querySelector('input[name="deliveryArea"]:checked');
    let deliveryCharge = selectedDelivery ? parseInt(selectedDelivery.getAttribute('price')) : 60;

    let grandTotal = subtotal + deliveryCharge;

    let payMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
    let advanceInput = document.getElementById('advanceAmount');
    let advanceAmount = 0;

    if (payMethodRadio && payMethodRadio.value === 'MobileBanking' && advanceInput) {
        advanceAmount = parseInt(advanceInput.value) || 0;
    }

    let dueAmount = grandTotal - advanceAmount;
    if (dueAmount < 0) dueAmount = 0;

    const subTotalEl = document.getElementById('subTotalAmount');
    const finalSubEl = document.getElementById('finalSubtotal');
    const finalDelEl = document.getElementById('finalDelivery');
    const grandTotalEl = document.getElementById('grandTotal');

    if (subTotalEl) subTotalEl.innerText = '৳' + subtotal;
    if (finalSubEl) finalSubEl.innerText = '৳' + subtotal;
    if (finalDelEl) finalDelEl.innerText = '৳' + deliveryCharge;
    if (grandTotalEl) grandTotalEl.innerText = '৳' + grandTotal;

    const totalBox = document.querySelector('.final-total-box');
    let extraRows = document.getElementById('advanceDueRows');

    if (payMethodRadio && payMethodRadio.value === 'MobileBanking') {
        if (!extraRows && totalBox) {
            extraRows = document.createElement('div');
            extraRows.id = 'advanceDueRows';
            totalBox.appendChild(extraRows);
        }
        if (extraRows) {
            extraRows.innerHTML = `
                <div class="total-row-item" style="color: #27ae60; margin-top: 5px;"><span>অগ্রিম পরিশোধিত:</span> <span>- ৳${advanceAmount}</span></div>
                <div class="total-row-item final-price" style="color: #d9534f; font-size: 16px; margin-top: 4px;"><span>বাকি প্রদেয় (COD):</span> <span>৳${dueAmount}</span></div>
            `;
        }
    } else if (extraRows) {
        extraRows.remove();
    }
}

// WhatsApp-এ সমস্ত ডিটেইলস সহ অর্ডার পাঠানো
function sendWhatsAppOrder() {
    let cart = getCart();
    if (cart.length === 0) return;

    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const address = document.getElementById('custAddress')?.value.trim();

    if (!name || !phone || !address) {
        alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা পূরণ করুন!');
        return;
    }

    const deliveryAreaRadio = document.querySelector('input[name="deliveryArea"]:checked');
    const deliveryAreaName = deliveryAreaRadio ? (deliveryAreaRadio.value === 'Khulna Sadar' ? 'খুলনা সদর' : 'খুলনার বাহিরে') : 'খুলনা সদর';
    const deliveryCharge = deliveryAreaRadio ? parseInt(deliveryAreaRadio.getAttribute('price')) : 60;

    const payMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const payMethodName = payMethodRadio ? (payMethodRadio.value === 'COD' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'বিকাশ / নগদ / রকেট') : 'COD';

    let senderPhone = '';
    let advanceAmount = 0;

    if (payMethodRadio && payMethodRadio.value === 'MobileBanking') {
        senderPhone = document.getElementById('senderPhone')?.value.trim();
        advanceAmount = parseInt(document.getElementById('advanceAmount')?.value) || 0;

        if (!senderPhone) {
            alert('যে নম্বর থেকে টাকা পাঠিয়েছেন সেই প্রেরক নম্বরটি (Sender Number) দিন।');
            return;
        }
        if (advanceAmount <= 0) {
            alert('সঠিক অগ্রিম টাকার পরিমাণ লিখুন।');
            return;
        }
    }

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let grandTotal = subtotal + deliveryCharge;
    let dueAmount = grandTotal - advanceAmount;
    if (dueAmount < 0) dueAmount = 0;

    let message = `*নতুন অর্ডার বিস্তারিত (Website Order)*%0A%0A`;
    message += `*গ্রাহকের তথ্য:*%0A`;
    message += `• নাম: ${name}%0A`;
    message += `• মোবাইল: ${phone}%0A`;
    message += `• ঠিকানা: ${address}%0A%0A`;

    message += `*অর্ডার করা পণ্যসমূহ:*%0A`;
    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ${item.qty} টি (৳${item.price * item.qty})%0A`;
    });

    message += `%0A*পেমেন্ট ও বিলের বিবরণ:*%0A`;
    message += `• পণ্যমূল্য: ৳${subtotal}%0A`;
    message += `• ডেলিভারি চার্জ: ${deliveryAreaName} (৳${deliveryCharge})%0A`;
    message += `• সর্বমোট বিল: ৳${grandTotal}%0A`;
    message += `• পেমেন্ট মেথড: ${payMethodName}%0A`;

    if (payMethodRadio && payMethodRadio.value === 'MobileBanking') {
        message += `• পেমেন্ট পাঠানো নম্বর: ${senderPhone}%0A`;
        message += `• অগ্রিম পরিশোধিত: ৳${advanceAmount}%0A`;
        message += `• *বাকি প্রদেয় (COD): ৳${dueAmount}*%0A`;
    }

    const waUrl = `https://wa.me/8801517851338?text=${message}`;

    localStorage.removeItem('myCart');
    updateCartCount();
    toggleCartModal();

    window.open(waUrl, '_blank');
}

/* ==========================================
   ৪. ইমেজ জুম ও ফিল্টার
   ========================================== */
function openImageZoom(src) {
    const modal = document.getElementById('imageZoomModal');
    const img = document.getElementById('zoomedImg');
    if (modal && img) {
        img.src = src;
        modal.style.display = 'flex';
    }
}

function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    if (modal) modal.style.display = 'none';
}

function showWelcomeModal() {
    if (sessionStorage.getItem('welcomePopupShown') === 'true') return;

    if (!document.getElementById('welcomePopupModal')) {
        const popupHTML = `
            <div id="welcomePopupModal" class="welcome-popup-overlay">
                <div class="welcome-popup-box">
                    <span class="welcome-close-btn" onclick="closeWelcomePopup()">&times;</span>
                    <h3><i class="fa-solid fa-hand-holding-heart" style="color: #0284c7;"></i> স্বাগতম!</h3>
                    <p>আমাদের অফিসিয়াল সেলস পোর্টফোলিওতে আপনাকে জানাই আন্তরিক অভিনন্দন।</p>
                    <p>সেরা মানের আরএফএল পণ্যগুলো ব্রাউজ করুন এবং সহজেই আপনার অর্ডারটি সম্পন্ন করুন।</p>
                    <p style="margin-top: 10px; font-weight: 600; color: #16a34a;">
                        <i class="fa-brands fa-whatsapp"></i> পাইকারি মূল্যে প্রোডাক্ট ক্রয় করতে সরাসরি 
                        <a href="https://wa.me/8801517851338?text=হ্যালো%20ইমরান%20ভাই,%20আমি%20পাইকারি%20মূল্যে%20প্রোডাক্ট%20ক্রয়%20করতে%20চাই।" target="_blank" style="color: #25d366; text-decoration: underline;">WhatsApp-এ এসএমএস অথবা কল করুন</a>
                    </p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }

    const modal = document.getElementById('welcomePopupModal');
    if (modal) {
        setTimeout(() => {
            modal.classList.add('show-welcome');
            sessionStorage.setItem('welcomePopupShown', 'true');
        }, 300);

        setTimeout(() => {
            closeWelcomePopup();
        }, 5000);
    }
}

function closeWelcomePopup() {
    const modal = document.getElementById('welcomePopupModal');
    if (modal) {
        modal.classList.remove('show-welcome');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

window.addEventListener('load', showWelcomeModal);
// মোডালের ভেতরের 'কার্টে যোগ করুন' বাটনে ক্লিক ইভেন্ট সেট করা
    const cartBtn = document.getElementById('zoomCartBtn');
    if (cartBtn) {
        cartBtn.onclick = function() {
            // script.js এর addToCart ফাংশন কল করবে
            if (typeof addToCart === 'function') {
                addToCart(title, Number(price));
            }
            closeImageZoom();
        };
    }

    modal.style.display = 'flex';
}

// মোডাল বন্ধ করার ফাংশন
function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// মোডালের বাইরে কোথাও ক্লিক করলে যেন পপ-আপ বন্ধ হয়ে যায়
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageZoomModal');
    if (event.target === modal) {
        closeImageZoom();
    }
});
