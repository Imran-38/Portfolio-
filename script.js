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
   ৩. ই-কমার্স কার্ট ও মাল্টি-স্টেপ চেকআউট সিস্টেম
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

// প্রোডাক্ট কার্টে যোগ করা
function addToCart(name, price) {
    let cart = getCart();
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }

    saveCart(cart);
    toggleCartModal(); // কার্টে যোগ করার পর পপ-আপ ওপেন হবে
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
        renderCartItems();
    }
}

// কার্ট থেকে আইটেম ডিলিট করা
function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartItems();
}

// কার্ট পপ-আপ মোডাল ওপেন/ক্লোজ করা
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.toggle('show');
        goToStep1();
        renderCartItems();
    }
}

// কার্টের আইটেমগুলো স্ক্রিনে রেন্ডার করা
function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const summary = document.getElementById('cartSummary');
    if (!container) return;

    let cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding: 20px; color: #777;">আপনার কার্ট খালি আছে!</p>`;
        if (summary) summary.style.display = 'none';
        return;
    }

    if (summary) summary.style.display = 'block';

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        html += `
            <div class="cart-item-card">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">৳${item.price} × ${item.qty} = ৳${subtotal}</span>
                </div>
                <div class="cart-qty-ctrl">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="btn-remove" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('subTotalAmount').innerText = '৳' + total;
}

// চেকআউট ধাপ ১ থেকে ধাপ ২ তে যাওয়া
function goToStep1() {
    document.getElementById('checkoutStep1').style.display = 'block';
    document.getElementById('checkoutStep2').style.display = 'none';
}

function goToStep2() {
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    if (!name || !phone || !address) {
        alert('অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।');
        return;
    }

    document.getElementById('checkoutStep1').style.display = 'none';
    document.getElementById('checkoutStep2').style.display = 'block';
    calculateFinalTotal();
}

// পেমেন্ট মেথড চেঞ্জ হলে মোবাইল ব্যাংকিং ফিল্ড দেখানো/লুকানো
function togglePaymentDetails() {
    const payMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const mbDetails = document.getElementById('mobileBankingDetails');
    if (payMethod === 'MobileBanking') {
        mbDetails.style.display = 'block';
    } else {
        mbDetails.style.display = 'none';
        // COD সিলেক্ট করলে অগ্রিম ফিল্ড রিসেট হবে
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
    let deliveryCharge = parseInt(selectedDelivery.getAttribute('price')) || 60;

    let grandTotal = subtotal + deliveryCharge;
    
    let payMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
    let advanceInput = document.getElementById('advanceAmount');
    let advanceAmount = 0;

    if (payMethodRadio && payMethodRadio.value === 'MobileBanking' && advanceInput) {
        advanceAmount = parseInt(advanceInput.value) || 0;
    }

    let dueAmount = grandTotal - advanceAmount;
    if (dueAmount < 0) dueAmount = 0;

    document.getElementById('finalSubtotal').innerText = '৳' + subtotal;
    document.getElementById('finalDelivery').innerText = '৳' + deliveryCharge;
    document.getElementById('grandTotal').innerText = '৳' + grandTotal;

    const totalBox = document.querySelector('.final-total-box');
    let extraRows = document.getElementById('advanceDueRows');
    
    if (payMethodRadio && payMethodRadio.value === 'MobileBanking') {
        if (!extraRows) {
            extraRows = document.createElement('div');
            extraRows.id = 'advanceDueRows';
            totalBox.appendChild(extraRows);
        }
        extraRows.innerHTML = `
            <div class="total-row-item" style="color: #27ae60; margin-top: 5px;"><span>অগ্রিম পরিশোধিত:</span> <span>- ৳${advanceAmount}</span></div>
            <div class="total-row-item final-price" style="color: #d9534f; font-size: 16px; margin-top: 4px;"><span>বাকি প্রদেয় (COD):</span> <span>৳${dueAmount}</span></div>
        `;
    } else if (extraRows) {
        extraRows.remove();
    }
}

// WhatsApp-এ সমস্ত ডিটেইলস সহ অর্ডার পাঠানো
function sendWhatsAppOrder() {
    let cart = getCart();
    if (cart.length === 0) return;

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    const deliveryAreaRadio = document.querySelector('input[name="deliveryArea"]:checked');
    const deliveryAreaName = deliveryAreaRadio.value === 'Khulna Sadar' ? 'খুলনা সদর' : 'খুলনার বাহিরে';
    const deliveryCharge = parseInt(deliveryAreaRadio.getAttribute('price'));

    const payMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const payMethodName = payMethodRadio.value === 'COD' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'বিকাশ / নগদ / রকেট';

    let senderPhone = '';
    let advanceAmount = 0;

    if (payMethodRadio.value === 'MobileBanking') {
        senderPhone = document.getElementById('senderPhone').value.trim();
        advanceAmount = parseInt(document.getElementById('advanceAmount').value) || 0;

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

    if (payMethodRadio.value === 'MobileBanking') {
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

// পেজ লোড হওয়ার সাথে সাথে কার্ট কাউন্ট আপডেট করা
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

/* ==========================================
   ৪. ইমেজ জুম পপ-আপ মোডাল
   ========================================== */
function openImageZoom(src) {
    const modal = document.getElementById('imageZoomModal');
    const img = document.getElementById('zoomedImg');
    if (modal && img) {
        img.src = src;
        modal.classList.add('show');
    }
}

function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    if (modal) modal.classList.remove('show');
}

// ==========================================
// কাস্টম টোস্ট নোটিফিকেশন দেখানোর ফাংশন
// ==========================================
function showToast(message, type = 'success') {
    // পুরোনো কোনো টোস্ট থাকলে রিমুভ করে দেওয়া
    const existingToast = document.getElementById('customToastMessage');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'customToastMessage';
    toast.innerText = message;
    
    // টোস্ট নোটিফিকেশনের স্টাইল
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

    // ৩ সেকেন্ড পর অটোমেটিক ক্লোজ বা রিমুভ হবে
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// প্রোডাক্ট কার্টে যোগ করার নতুন লজিক
// ==========================================
function addToCart(name, price) {
    let cart = getCart();
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // অলরেডি যোগ থাকলে পরিমাণ বাড়ানো হবে না, শুধু নোটিফিকেশন দেখাবে
        showToast(`⚠️ এই পছন্দের প্রোডাক্টটি ইতিমধ্যেই কার্টে আছে!`, 'exists');
    } else {
        // প্রথমবার যোগ হলে কার্টে যুক্ত হবে
        cart.push({ name: name, price: price, qty: 1 });
        saveCart(cart);
        showToast(`✅ সফলভাবে কার্টে যুক্ত হয়েছে: ${name}`, 'success');
        
        // কার্টে নতুন আইটেম যোগ হলেই কেবল মোডাল ওপেন হবে (ঐচ্ছিক)
        toggleCartModal();
    }
}


// কার্টের আইটেমগুলো স্ক্রিনে রেন্ডার করা (খালি থাকলে মেসেজ ও বাটনের লিংকসহ)
function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const summary = document.getElementById('cartSummary');
    if (!container) return;

    let cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 25px 15px;">
                <p style="color: #666; font-size: 15px; margin-bottom: 6px;">আপনার কার্ট খালি আছে!</p>
                <p style="color: #0056b3; font-size: 14px; font-weight: 600; margin-bottom: 15px;">কার্ট লিস্ট প্রোডাক্ট অ্যাড করতে প্রোডাক্ট পেজে যান </p>
                <a href="products.html" style="display: inline-block; background-color: #0056b3; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                    <i class="fa-solid fa-box-open"></i> প্রোডাক্ট পেজে যান
                </a>
            </div>
        `;
        if (summary) summary.style.display = 'none';
        return;
    }

    if (summary) summary.style.display = 'block';

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        html += `
            <div class="cart-item-card">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">৳${item.price} × ${item.qty} = ৳${subtotal}</span>
                </div>
                <div class="cart-qty-ctrl">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="btn-remove" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('subTotalAmount').innerText = '৳' + total;
}




