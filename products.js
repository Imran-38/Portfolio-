/* =========================================================
   PRODUCTS PAGE SPECIFIC JAVASCRIPT (products.js)
   ========================================================= */

// প্রোডাক্ট ইমেজে ক্লিক করলে জুম মোডাল এবং বিস্তারিত ওপেন করা
function openProductZoom(imgSrc, title, brand, company, price, featuresStr) {
    const modal = document.getElementById('imageZoomModal');
    if (!modal) return;

    const zoomedImg = document.getElementById('zoomedImg');
    const zoomTitle = document.getElementById('zoomTitle');
    const zoomBrand = document.getElementById('zoomBrand');
    const zoomCompany = document.getElementById('zoomCompany');
    const zoomPrice = document.getElementById('zoomPrice');

    if (zoomedImg) zoomedImg.src = imgSrc;
    if (zoomTitle) zoomTitle.innerText = title;
    if (zoomBrand) zoomBrand.innerText = brand;
    if (zoomCompany) zoomCompany.innerText = company;
    if (zoomPrice) zoomPrice.innerText = '৳' + price;

    // পণ্যের বৈশিষ্ট্যগুলো লিস্ট আকারে তৈরি করা
    const featuresList = document.getElementById('zoomFeatures');
    if (featuresList) {
        featuresList.innerHTML = '';
        const features = featuresStr.split('|');
        features.forEach(feat => {
            const li = document.createElement('li');
            li.innerText = feat;
            featuresList.appendChild(li);
        });
    }

    // মোডালের ভেতরের 'কার্টে যোগ করুন' বাটনে ক্লিক ইভেন্ট সেট করা
    const cartBtn = document.getElementById('zoomCartBtn');
    if (cartBtn) {
        cartBtn.onclick = function() {
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


// ক্যাটাগরি ফিল্টার ফাংশন
function filterCategory(category) {
    const items = document.querySelectorAll('.catalog-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// প্রোডাক্টের ছবিতে ক্লিক করলে ডিটেইলস মোডাল ওপেন করার ফাংশন
function openProductModal(title, category, oldPrice, newPrice, imgSrc, description) {
    const modal = document.getElementById('productDetailsModal');
    if (!modal) return;

    document.getElementById('modalProductImg').src = imgSrc;
    document.getElementById('modalProductTitle').innerText = title;
    document.getElementById('modalProductCategory').innerText = category.toUpperCase();
    document.getElementById('modalProductOldPrice').innerText = '৳' + oldPrice;
    document.getElementById('modalProductPrice').innerText = '৳' + newPrice;
    document.getElementById('modalProductDesc').innerText = description;

    // কার্ট বাটনের অনক্লিক ইভেন্ট সেট করা
    const cartBtn = document.getElementById('modalAddToCartBtn');
    if (cartBtn) {
        cartBtn.onclick = function() {
            addToCart(title, Number(newPrice));
            closeProductModal();
        };
    }

    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('productDetailsModal');
    if (modal) modal.style.display = 'none';
}
// মূল ক্যাটাগরি ফিল্টার
function filterCategory(category) {
    const items = document.querySelectorAll('.catalog-item');
    const buttons = document.querySelectorAll('.filter-btn');
    const subContainer = document.getElementById('helmetSubCatContainer');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // হেলমেট সিলেক্ট করলে সাব-ক্যাটাগরি বাটনগুলো অন হবে
    if (category === 'helmet' || category === 'all') {
        if (subContainer) subContainer.style.display = 'flex';
    } else {
        if (subContainer) subContainer.style.display = 'none';
    }

    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}
// মূল ক্যাটাগরি ফিল্টার
function filterCategory(category) {
    const items = document.querySelectorAll('.catalog-item');
    const buttons = document.querySelectorAll('.filter-btn');
    const subContainer = document.getElementById('helmetSubCatContainer');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // শুধুমাত্র 'helmet' এ ক্লিক করলেই সাব-ক্যাটাগরি বাটনগুলো দেখাবে, অন্যথায় লুকানো থাকবে
    if (subContainer) {
        if (category === 'helmet') {
            subContainer.style.display = 'flex';
        } else {
            subContainer.style.display = 'none';
        }
    }

    // প্রোডাক্ট ফিল্টারিং লজিক
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// হেলমেটের সাব-ক্যাটাগরি ফিল্টার (ফুল ফেস, হাফ ফেস, গ্রাফিক্স)
function filterSubCategory(subCat) {
    const items = document.querySelectorAll('.catalog-item[data-category="helmet"]');
    const subButtons = document.querySelectorAll('.sub-filter-btn');

    subButtons.forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    items.forEach(item => {
        const itemSub = item.getAttribute('data-subcat') || '';
        if (subCat === 'all-helmet' || itemSub.includes(subCat)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}
