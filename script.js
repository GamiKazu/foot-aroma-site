const menuButton = document.querySelector(".menu-button");
const globalNav = document.querySelector(".global-nav");

if (menuButton && globalNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = globalNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      globalNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
