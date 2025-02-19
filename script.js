document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {
        const prevButton = carousel.querySelector(".prev");
        const nextButton = carousel.querySelector(".next");
        const track = carousel.querySelector(".carousel-track");
        const images = track.querySelectorAll("img");

        let index = 0; // Start at the first image
        const numVisible = parseInt(carousel.dataset.images, 10); // Get how many images should be visible
        const imgWidth = carousel.clientWidth / numVisible; // Get width for each image

        function updateCarousel() {
            track.style.transform = `translateX(-${index * imgWidth}px)`;
        }

        prevButton.addEventListener("click", () => {
            index = (index > 0) ? index - numVisible : images.length - numVisible;
            updateCarousel();
        });

        nextButton.addEventListener("click", () => {
            index = (index < images.length - numVisible) ? index + numVisible : 0;
            updateCarousel();
        });

        // Ensure carousel resizes correctly
        window.addEventListener("resize", updateCarousel);
    });
});
