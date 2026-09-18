// ১. মোবাইল নেভিগেশন মেনু টগল
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if(menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ২. কাস্টম ভাষা নির্বাচন ও ট্রান্সলেট লজিক
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');

if(langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        langMenu.classList.remove('show');
    });
}

function translatePage(langCode, langText) {
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change'));
        document.getElementById('currentLang').innerText = langText.split(' ')[1] || langText;
    } else {
        document.cookie = "googtrans=/bn/" + langCode + "; path=/;";
        location.reload();
    }
    if(langMenu) langMenu.classList.remove('show');
}

// ৩. টাইপিং এনিমেশন
const words = ["সেলস রিপ্রেজেন্টেটিভ", "বিজনেস ডেভেলপার", "কাস্টমার এক্সপার্ট"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.querySelector('.typing-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.querySelector('.typing-text').innerHTML = word.join("");
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

// ৪. প্রোডাক্ট ফিল্টার
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

// ৫. হোয়াটসঅ্যাপ মেসেজিং ফর্ম
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('custName').value;
    let phone = document.getElementById('custPhone').value;
    let message = document.getElementById('custMsg').value;

    let whatsappURL = `https://wa.me/8801517851338?text=হ্যালো ইমরান ভাই, আমি %0Aনাম: ${name} %0Aফোন: ${phone} %0Aমেসেজ: ${message}`;

    window.open(whatsappURL, '_blank');
});

// ৬. মোবাইল শেয়ারিং ও কপি লিংক
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
            alert("লিংক কপি করতে সমস্যা হয়েছে।");
        });
    }
}

// ৭. FAQ Accordion Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// ৮. Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

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
