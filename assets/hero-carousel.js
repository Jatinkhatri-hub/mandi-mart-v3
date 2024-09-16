
let currentSlide = 0;
let timeoutId; // Variable to store the timeout ID

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.carousel').style.transform = 'translateX(' + offset + '%)';
    // Clear existing timeout and start a new one
    clearTimeout(timeoutId);
    timeoutId = setTimeout(autoSlide, 6000);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function autoSlide() {
    nextSlide();
}

document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    timeoutId = setTimeout(autoSlide, 6000); // Start auto sliding after 6 seconds
});