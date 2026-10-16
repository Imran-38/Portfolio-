// ১. মোবাইল নেভিগেশন মেনু টগল ও অটো ক্লোজ
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

// ২. টাইপিং এনিমেশন
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

// ৩. প্রোডাক্ট ফিল্টার
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        productCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ৪. হোয়াটসঅ্যাপ মেসেজিং ফর্ম
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let name = document.getElementById('custName').value;
        let phone = document.getElementById('custPhone').value;
        let message = document.getElementById('custMsg').value;

        let whatsappURL = `https://wa.me/8801517851338?text=হ্যালো ইমরান ভাই, আমি %0Aনাম: ${name} %0Aফোন: ${phone} %0Aমেসেজ: ${message}`;

        window.open(whatsappURL, '_blank');
    });
}

// ৫. মোবাইল শেয়ারিং ও কপি লিংক
function copyWebsiteLink() {
    if (navigator.share) {
        navigator.share({
            title: 'মো: ইমরান হোসেন | আরএফএল গ্রুপ',
            text: 'মো: ইমরান হোসেন - আরএফএল গ্রুপ সেলস পোর্টফোলিও',
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("আপনার পোর্টফোলিও লিংকটি কপি হয়েছে!");
        }).catch(err => {
            alert("লিংক কপি করতে সমস্যা হয়েছে। ব্রাউজার থেকে কপি করুন।");
        });
    }
}

// ৬. FAQ Accordion Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// ৭. Back to Top Button
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
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==========================================
// Modern Carousel & Lightbox Implementation
// ==========================================

const carouselSlide = document.querySelector('.carousel-slide');
const slideItems = document.querySelectorAll('.slide-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

let counter = 0;
const totalSlides = slideItems.length;

// ইমেজ ইউআরএল লিস্ট নেওয়া
const imagesList = Array.from(document.querySelectorAll('.slide-item img')).map(img => img.src);

if (carouselSlide && totalSlides > 0) {
    // ডট তৈরি
    slideItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        carouselSlide.style.transform = `translateX(${-counter * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[counter]) dots[counter].classList.add('active');
    }

    function nextSlide() {
        counter = (counter + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        counter = (counter - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        counter = index;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // অটো স্লাইড
    let autoSlide = setInterval(nextSlide, 3500);

    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(autoSlide));
    container.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 3500));

    // মোবাইলে স্লাইডার সোয়াইপ (Touch Swipe for Main Carousel)
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleCarouselSwipe();
    }, {passive: true});

    function handleCarouselSwipe() {
        if (touchEndX < touchStartX - 40) nextSlide();
        if (touchEndX > touchStartX + 40) prevSlide();
    }
}

// ==========================================
// Lightbox Modal Functions
// ==========================================

let currentLbIndex = 0;
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');

function openLightbox(index) {
    currentLbIndex = index;
    updateLightbox();
    lightboxModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল বন্ধ
}

function closeLightbox() {
    lightboxModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function changeLbSlide(direction) {
    currentLbIndex = (currentLbIndex + direction + imagesList.length) % imagesList.length;
    updateLightbox();
}

function updateLightbox() {
    lightboxImg.src = imagesList[currentLbIndex];
    lightboxCounter.textContent = `${currentLbIndex + 1} / ${imagesList.length}`;
}

// লাইটবক্সের মোবাইল সোয়াইপ সাপোর্ট (Swipe Inside Lightbox)
let lbTouchStartX = 0;
let lbTouchEndX = 0;

lightboxModal.addEventListener('touchstart', e => { lbTouchStartX = e.changedTouches[0].screenX; }, {passive: true});
lightboxModal.addEventListener('touchend', e => {
    lbTouchEndX = e.changedTouches[0].screenX;
    if (lbTouchEndX < lbTouchStartX - 40) changeLbSlide(1);
    if (lbTouchEndX > lbTouchStartX + 40) changeLbSlide(-1);
}, {passive: true});

// কীবোর্ড নেভিগেশন (Left, Right & Escape Key)
document.addEventListener('keydown', e => {
    if (!lightboxModal.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') changeLbSlide(1);
    if (e.key === 'ArrowLeft') changeLbSlide(-1);
});
// আল্ট্রা-মডার্ন সেলস চার্ট (Glow Gradient Effect)
const modernCtx = document.getElementById('modernSalesChart');

if (modernCtx) {
    const chartCtx = modernCtx.getContext('2d');

    // কালার গ্র্যাডিয়েন্ট তৈরি (Gradient Fills)
    const grad2024 = chartCtx.createLinearGradient(0, 0, 0, 350);
    grad2024.addColorStop(0, 'rgba(148, 163, 184, 0.35)');
    grad2024.addColorStop(1, 'rgba(148, 163, 184, 0.0)');

    const grad2025 = chartCtx.createLinearGradient(0, 0, 0, 350);
    grad2025.addColorStop(0, 'rgba(2, 132, 199, 0.45)');
    grad2025.addColorStop(1, 'rgba(2, 132, 199, 0.0)');

    const grad2026 = chartCtx.createLinearGradient(0, 0, 0, 350);
    grad2026.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
    grad2026.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    new Chart(modernCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: '২০২৪ সেলস',
                    data: [194, 242, 86, 250, 165, 200, 315, 442, 332, 452, 273, 490],
                    borderColor: '#94a3b8',
                    backgroundColor: grad2024,
                    borderWidth: 2,
                    pointBackgroundColor: '#94a3b8',
                    pointHoverRadius: 7,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '২০২৫ সেলস',
                    data: [600, 505, 458, 460, 505, 486, 551, 634, 331, 747, 656, 667],
                    borderColor: '#0284c7',
                    backgroundColor: grad2025,
                    borderWidth: 3,
                    pointBackgroundColor: '#0284c7',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 8,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '২০২৬ সেলস (চলতি বছর)',
                    data: [660, 601, 601, 601, 603, 716, 715, 653, null, null, null, null],
                    borderColor: '#10b981',
                    backgroundColor: grad2026,
                    borderWidth: 3.5,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 9,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { size: 13, weight: '600' },
                        padding: 18
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 12,
                    displayColors: true,
                    boxPadding: 6
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(226, 232, 240, 0.7)',
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12 },
                        color: '#64748b'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 12 },
                        color: '#64748b'
                    }
                }
            }
        }
    });
}

// ==========================================
// Pop-up Cart Modal Logic
// ==========================================

function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.toggle('show');
        renderCartItems();
    }
}

function getCart() {
    return JSON.parse(localStorage.getItem('myCart')) || [];
}

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

function addToCart(name, price) {
    let cart = getCart();
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }

    saveCart(cart);
    
    // Automatically open modal pop-up on item addition
    toggleCartModal();
}

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

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartItems();
}

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
    document.getElementById('totalAmount').innerText = '৳' + total;
}

function sendWhatsAppOrder(event) {
    event.preventDefault();
    let cart = getCart();
    if (cart.length === 0) {
        alert('আপনার কার্ট খালি!');
        return;
    }

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const note = document.getElementById('custNote').value;

    let message = `*নতুন অর্ডার বিস্তারিত (Website Order)*%0A%0A`;
    message += `*গ্রাহকের তথ্য:*%0A`;
    message += `• নাম: ${name}%0A`;
    message += `• মোবাইল: ${phone}%0A`;
    message += `• ঠিকানা: ${address}%0A`;
    if (note) message += `• নোট: ${note}%0A`;

    message += `%0A*অর্ডার করা পণ্যসমূহ:*%0A`;
    let total = 0;
    cart.forEach((item, i) => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        message += `${i + 1}. ${item.name} - ${item.qty} টি (৳${subtotal})%0A`;
    });

    message += `%0A*সর্বমোট মূল্য:* ৳${total}`;

    const waUrl = `https://wa.me/8801517851338?text=${message}`;
    
    localStorage.removeItem('myCart');
    updateCartCount();
    toggleCartModal();

    window.open(waUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});


// ==========================================
// Pop-up Cart Modal & Multi-step Logic
// ==========================================

function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.toggle('show');
        goToStep1();
        renderCartItems();
    }
}

function getCart() {
    return JSON.parse(localStorage.getItem('myCart')) || [];
}

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

function addToCart(name, price) {
    let cart = getCart();
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }

    saveCart(cart);
    toggleCartModal();
}

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

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartItems();
}

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

// Multi-step Navigation
function goToStep1() {
    document.getElementById('checkoutStep1').style.display = 'block';
    document.getElementById('checkoutStep2').style.display = 'none';
}

function goToStep2() {
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    if (!name || !phone || !address) {
        alert('অনুগ্রহ করে নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।');
        return;
    }

    document.getElementById('checkoutStep1').style.display = 'none';
    document.getElementById('checkoutStep2').style.display = 'block';
    calculateFinalTotal();
}

function togglePaymentDetails() {
    const payMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const mbDetails = document.getElementById('mobileBankingDetails');
    if (payMethod === 'MobileBanking') {
        mbDetails.style.display = 'block';
    } else {
        mbDetails.style.display = 'none';
    }
}

function calculateFinalTotal() {
    let cart = getCart();
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    let selectedDelivery = document.querySelector('input[name="deliveryArea"]:checked');
    let deliveryCharge = parseInt(selectedDelivery.getAttribute('price')) || 60;

    let grandTotal = subtotal + deliveryCharge;

    document.getElementById('finalSubtotal').innerText = '৳' + subtotal;
    document.getElementById('finalDelivery').innerText = '৳' + deliveryCharge;
    document.getElementById('grandTotal').innerText = '৳' + grandTotal;
}

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
    if (payMethodRadio.value === 'MobileBanking') {
        senderPhone = document.getElementById('senderPhone').value.trim();
        if (!senderPhone) {
            alert('টাকা পাঠানোর নম্বরটি (Sender Number) প্রদান করুন।');
            return;
        }
    }

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let grandTotal = subtotal + deliveryCharge;

    let message = `*নতুন অর্ডার বিস্তারিত (Website Order)*%0A%0A`;
    message += `*গ্রাহকের তথ্য:*%0A`;
    message += `• নাম: ${name}%0A`;
    message += `• মোবাইল: ${phone}%0A`;
    message += `• ঠিকানা: ${address}%0A%0A`;

    message += `*অর্ডার করা পণ্যসমূহ:*%0A`;
    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ${item.qty} টি (৳${item.price * item.qty})%0A`;
    });

    message += `%0A*পেমেন্ট ও ডেলিভারি বিবরণ:*%0A`;
    message += `• পণ্যমূল্য: ৳${subtotal}%0A`;
    message += `• ডেলিভারি এরিয়া: ${deliveryAreaName} (৳${deliveryCharge})%0A`;
    message += `• সর্বমোট প্রদেয়: ৳${grandTotal}%0A`;
    message += `• পেমেন্ট মেথড: ${payMethodName}%0A`;

    if (senderPhone) {
        message += `• পেমেন্ট পাঠানো নম্বর: ${senderPhone}%0A`;
    }

    const waUrl = `https://wa.me/8801517851338?text=${message}`;
    
    localStorage.removeItem('myCart');
    updateCartCount();
    toggleCartModal();

    window.open(waUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});



