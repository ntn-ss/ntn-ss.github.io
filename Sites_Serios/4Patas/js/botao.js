const toTop = document.querySelector(".toTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 30 && window.pageYOffset < 8850) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});