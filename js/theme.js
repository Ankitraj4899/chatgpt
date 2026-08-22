const togglebtn = document.querySelector('.toggle-theme');

const body = document.body;


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
}

togglebtn.addEventListener('click', () => {
    toggleTheme();
})
