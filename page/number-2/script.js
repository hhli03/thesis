document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const bodyText = document.querySelector('.body-text');

    // Show the button when scrolling down
    bodyText.addEventListener('scroll', function() {
        if (bodyText.scrollTop > 300) {  // Adjust this value to control when it appears
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    // Scroll back to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        bodyText.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".image img");

    images.forEach(image => {
        image.addEventListener("mouseover", function() {
            this.style.zIndex = "1000";  // Bring to front when hovering
        });

        image.addEventListener("mouseout", function() {
            this.style.zIndex = "-1";  // Send back when not hovering
        });

        image.addEventListener("click", function() {
            const popup = document.querySelector(".image-popup");
            const popupImage = document.querySelector(".popup-image");

            popupImage.src = this.src;
            popup.classList.add("show");
        });
    });

    const popup = document.querySelector(".image-popup");
    const popupImage = document.querySelector(".popup-image");

    popup.addEventListener("click", function(event) {
        if (event.target !== popupImage) {
            popup.classList.remove("show");
            popupImage.src = ""; // Clear image source for better performance
        }
    });
});
