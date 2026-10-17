/* =========================================================
   PRODUCTS PAGE SPECIFIC JAVASCRIPT (products.js)
   ========================================================= */

// প্রোডাক্ট ইমেজে ক্লিক করলে জুম মোডাল এবং বিস্তারিত ওপেন করা
function openProductZoom(imgSrc, title, brand, company, price, featuresStr) {
    const modal = document.getElementById('imageZoomModal');
    if (!modal) return;

    document.getElementById('zoomedImg').src = imgSrc;
    document.getElementById('zoomTitle').innerText = title;
    document.getElementById('zoomBrand').innerText = brand;
    document.getElementById('zoomCompany').innerText = company;
    document.getElementById('zoomPrice').innerText = '৳' + price;

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
            // main script.js এর addToCart ফাংশন কল করবে
            if (typeof addToCart === 'function') {
                addToCart(title, price);
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
