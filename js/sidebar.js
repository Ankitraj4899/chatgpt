const sidebar = document.querySelector(".chatgpt__sidebar");
const overlay = document.querySelector(".chatgpt__sidebar-overlay");

const collapseBtn = document.querySelector(".collapse--btn");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

const mobileMenuIcon = mobileMenuBtn.querySelector("img");


/* Desktop sidebar collapse */

collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});


/* Mobile sidebar */

mobileMenuBtn.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");

        mobileMenuIcon.src = "assets/menu.svg";
    } else {
        sidebar.classList.add("open");
        overlay.classList.add("active");

        mobileMenuIcon.src = "assets/close.svg";
    }
});


/* Close sidebar from overlay */

overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");

    mobileMenuIcon.src = "assets/menu.svg";
});