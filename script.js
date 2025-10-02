// Lấy tất cả section và link trong menu
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// Logo: về Home và reload (check tồn tại)
const logoLinkEl = document.getElementById("logo-link");
if (logoLinkEl) {
  logoLinkEl.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "#home";
    setTimeout(() => { window.location.reload(); }, 100);
  });
}

console.log("Website Aurora Travel đã load thành công!");

// Refresh trang khi click vào logo image
const logoImg = document.querySelector(".logo img");
if (logoImg) {
  logoImg.addEventListener("click", () => { window.location.reload(); });
}

console.log("Website Aurora Travel đã load thành công!");

// Nếu trang gốc dùng observer trước đó, đảm bảo tạo fallback observer để tránh lỗi
// (nếu file gốc đã có observer, đoạn này sẽ không làm hỏng: define local 'observer' nếu chưa tồn tại)
if (typeof observer === 'undefined') {
  // observer dùng để quan sát các section cho mục đích highlight/reveal (fallback)
  var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
}

// Đăng ký quan sát tất cả section (an toàn ngay cả khi observer có sẵn)
if (sections && sections.length) {
  sections.forEach(section => {
    try { observer.observe(section); } catch (e) { /* ignore */ }
  });
}

// -----------------------
// Phần bổ sung: counter, countdown, back-to-top, fade-in (thêm)
// -----------------------

// Wait until DOM parsed (script loaded with defer, but keep safe)
document.addEventListener("DOMContentLoaded", function () {

  // --- Counter animation (các .counter mới được thêm) ---
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText.replace(/,/g,'') || 0;
      const increment = Math.max(1, Math.floor(target / 200));
      if (current < target) {
        const next = Math.min(target, current + increment);
        counter.innerText = next.toLocaleString();
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });

  // --- Countdown Timer ---
  // chỉnh ngày khởi hành ở đây nếu cần:
  const TOUR_DATE = new Date("Oct 15, 2025 08:00:00").getTime();
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    // show element (if previously hidden)
    countdownEl.style.display = "block";
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = TOUR_DATE - now;
      if (distance <= 0) {
        countdownEl.innerText = "Tour đã khởi hành!";
        clearInterval(countdownInterval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      countdownEl.innerText = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    };
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
  }

  // --- Back to top button ---
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) backBtn.style.display = "block";
      else backBtn.style.display = "none";
    });
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Floating contact tooltips and safety (no JS required, but ensure links open) ---
  // nothing special required — links are normal <a href="..."> so they navigate.

  // --- Fade-in on scroll (IntersectionObserver already created above as 'observer') ---
  // We already observe all sections with observer above; ensure .fade-in elements get the 'visible' class.
  const fadeEls = document.querySelectorAll(".fade-in");
  fadeEls.forEach(el => {
    try { observer.observe(el); } catch (e) { /* ignore */ }
  });

  // Optional: ensure the CTA scroll/anchor works: scroll-behavior in CSS handles this.
});
