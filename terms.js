/* ==========================================
   Terms Page Quick Scroll & Tab Logic
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
    const pillButtons = document.querySelectorAll('.pill-btn');

    pillButtons.forEach(button => {
        button.addEventListener('click', function() {
            // অ্যাক্টিভ ক্লাস চেঞ্জ
            pillButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // ক্লিক করলে নির্দিষ্ট সেকশনে স্মুথ স্ক্রোল
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
