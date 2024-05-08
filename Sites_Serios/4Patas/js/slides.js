let slideIndex = 1;
let sliderColor = document.getElementById("sliderBg");

showSlides(slideIndex);


setInterval(function () {plusSlides(1)}, 5000);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  if (slideIndex == 2) {
    sliderColor.style.backgroundColor = "#FFA124";
  }

  else {
    sliderColor.style.backgroundColor = "#76562A";
  }
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slidepage");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}