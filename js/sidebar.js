const sidebar = document.querySelector(".chatgpt__sidebar");
const collapseButton = document.querySelector(".collapse--btn");
const overlay = document.querySelector(".chatgpt__sidebar-overlay");

console.log("sidebar:", sidebar);
console.log("button:", collapseButton);
console.log("overlay:", overlay);

if (collapseButton && sidebar) {
    collapseButton.addEventListener("click", () => {
        console.log("collapse clicked");

        if (window.innerWidth <= 800) {
            sidebar.classList.toggle("open");
            overlay?.classList.toggle("active");
        } else {
            sidebar.classList.toggle("collapsed");
        }
    });
}

if (overlay) {
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    });
}