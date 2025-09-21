// Lấy tất cả section và link trong menu
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// Logo: về Home và reload
document.getElementById("logo-link").addEventListener("click", (e) => {
  e.preventDefault();              // chặn hành động mặc định của thẻ <a>
  window.location.href = "#home";  // cuộn về section Home
  setTimeout(() => {
    window.location.reload();      // reload sau 100ms để đảm bảo đã cuộn về Home
  }, 100);
});

console.log("Website Aurora Travel đã load thành công!");

// Refresh trang khi click vào logo
document.querySelector(".logo img").addEventListener("click", () => {
  window.location.reload();
});

console.log("Website Aurora Travel đã load thành công!");

// Đăng ký quan sát tất cả section
sections.forEach(section => observer.observe(section));
