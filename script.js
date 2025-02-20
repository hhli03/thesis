document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {
        const prevButton = carousel.querySelector(".prev");
        const nextButton = carousel.querySelector(".next");
        const track = carousel.querySelector(".carousel-track");
        const images = track.querySelectorAll("img");
        let index = 0;
        const numVisible = parseInt(carousel.dataset.images, 10);
        const imgWidth = carousel.clientWidth / numVisible;
        let isSliding = false;

        // Function to update the carousel position
        function updateCarousel() {
            isSliding = true;
            track.style.transition = "transform 0.5s ease";
            track.style.transform = `translateX(-${index * imgWidth}px)`;
            setTimeout(() => isSliding = false, 500);
        }

        // Previous button functionality
        prevButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (!isSliding) {
                index = (index > 0) ? index - 1 : images.length - numVisible;
                updateCarousel();
            }
        });

        // Next button functionality
        nextButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (!isSliding) {
                index = (index < images.length - numVisible) ? index + 1 : 0;
                updateCarousel();
            }
        });

        // Allow link navigation only when not sliding
        track.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (event) => {
                if (isSliding) {
                    event.preventDefault(); // Prevent navigation while sliding
                }
            });
        });

        // Update carousel position on window resize
        window.addEventListener("resize", updateCarousel);
    });
});
