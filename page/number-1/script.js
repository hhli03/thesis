document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    // Show the button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {  // Show after scrolling 300px
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    // Scroll back to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".image img");
    const popup = document.createElement("div");
    popup.classList.add("image-popup");
    document.body.appendChild(popup);

    images.forEach(image => {
        image.addEventListener("click", function() {
            const popupImage = document.createElement("img");
            popupImage.src = this.src;
            popup.innerHTML = "";
            popup.appendChild(popupImage);
            popup.classList.add("show");
        });
    });

    popup.addEventListener("click", function() {
        popup.classList.remove("show");
    });
});

