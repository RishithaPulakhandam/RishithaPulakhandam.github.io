// Scroll reveal animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold:0.2, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Modal controls
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) modal.style.display = "none";
  });
};

// Accordion Functionality
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector(".icon");

    header.classList.toggle("active");
    content.classList.toggle("open");

    // Rotate icon
    if (header.classList.contains("active")) {
      icon.textContent = "×"; // change + to ×
    } else {
      icon.textContent = "+"; // back to +
    }
  });
});

