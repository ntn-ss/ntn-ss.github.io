const toTop = document.querySelector(".arrow");

window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});