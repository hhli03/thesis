document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    // Show the button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {  // Checks the scroll position of the window
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

document.addEventListener('DOMContentLoaded', function () {
    const subHeadings = document.querySelectorAll('.sub-heading');

    // Function to adjust the sub-heading text
    const adjustSubHeadings = () => {
        subHeadings.forEach(subHeading => {
            // Store the original text to prevent multiple line breaks
            const originalText = subHeading.getAttribute('data-original-text') || subHeading.textContent.trim();
            subHeading.setAttribute('data-original-text', originalText);

            // Reset the text to original before recalculating
            subHeading.innerHTML = `&emsp;&emsp;${originalText}`;

            // Function to check if the text overflows
            const isOverflowing = (element) => {
                return element.scrollWidth > element.clientWidth;
            };

            // Check if the text overflows the container
            if (isOverflowing(subHeading)) {
                // Calculate the character count and split point
                const totalChars = originalText.length;
                const breakPoint = Math.ceil(totalChars / 2);

                // Find the nearest space to break at the midpoint
                let splitIndex = breakPoint;
                while (splitIndex > 0 && originalText[splitIndex] !== ' ') {
                    splitIndex--;
                }

                // If no space found, force split at the midpoint
                if (splitIndex === 0) splitIndex = breakPoint;

                // Split the text at the calculated point
                const firstLine = originalText.slice(0, splitIndex).trim();
                const secondLine = originalText.slice(splitIndex).trim();

                // Reconstruct the text with line break and consistent indentation
                subHeading.innerHTML = `&emsp;&emsp;${firstLine}<br>&emsp;&emsp;${secondLine}`;
            }
        });
    };

    // Initial execution
    adjustSubHeadings();

    // Recalculate on window resize
    window.addEventListener('resize', adjustSubHeadings);
});
