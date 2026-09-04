// 1. Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ปิดเมนูเมื่อกดเลือกลิงก์ (สำหรับมือถือ)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// 2. Modal (Popup) Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // ล็อกไม่ให้เลื่อนหน้าจอหลักตอนเปิด Popup
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // คืนค่าการเลื่อนหน้าจอ
  }
}

// ปิด Popup เมื่อคลิกพื้นที่ว่างด้านนอก (Overlay)
window.onclick = function (event) {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active");
    document.body.style.overflow = "auto";
  }
};