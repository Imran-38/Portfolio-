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

    