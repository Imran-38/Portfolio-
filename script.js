
// ১. মোবাইল নেভিগেশন মেনু টগল
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ২. ডাইনামিক টাইপিং এনিমেশন
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

// ৩. ডাইনামিক প্রোডাক্ট ফিল্টার
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

// ৪. ডাইনামিক হোয়াটসঅ্যাপ মেসজিং ফাংশন
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('custName').value;
    let phone = document.getElementById('custPhone').value;
    let message = document.getElementById('custMsg').value;
    
    let whatsappURL = `https://wa.me/8801517851338?text=হ্যালো ইমরান ভাই, আমি %0Aনাম: ${name} %0Aফোন: ${phone} %0Aমেসেজ: ${message}`;
    
    window.open(whatsappURL, '_blank');
});
// ওয়েবসাইট লিংক কপি করার ফাংশন
function copyWebsiteLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("আপনার পোর্টফোলিও লিংকটি কপি হয়েছে! এখন যে কাউকে পাঠাতে পারবেন।");
    }).catch(err => {
        console.error('কপি করতে সমস্যা হয়েছে: ', err);
    });
}
// FAQ Accordion Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});
