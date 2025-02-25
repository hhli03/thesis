document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const bodyText = document.querySelector('.body-text');

    // Function to check the scroll position and toggle the button visibility
    function toggleScrollButton() {
        // Check if the user is on mobile or desktop
        if (window.innerWidth <= 768) {
            // For mobile: Use window scroll instead of bodyText
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        } else {
            // For desktop: Use bodyText scroll
            if (bodyText.scrollTop > 300) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        }
    }

    // Check scroll on both bodyText and window
    bodyText.addEventListener('scroll', toggleScrollButton);
    window.addEventListener('scroll', toggleScrollButton);

    // Scroll back to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // For mobile: Scroll window to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // For desktop: Scroll bodyText to top
            bodyText.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
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
                // Calculate the character count and midpoint
                const totalChars = originalText.length;
                const midPoint = Math.ceil(totalChars / 2);

                // Find the nearest space to break at the midpoint
                let splitIndex = midPoint;
                let leftIndex = midPoint;
                let rightIndex = midPoint;

                // Search for space on both sides of the midpoint
                while (leftIndex > 0 || rightIndex < totalChars) {
                    if (originalText[leftIndex] === ' ') {
                        splitIndex = leftIndex;
                        break;
                    }
                    if (originalText[rightIndex] === ' ') {
                        splitIndex = rightIndex;
                        break;
                    }
                    leftIndex--;
                    rightIndex++;
                }

                // If no space is found, force break at the midpoint
                if (splitIndex === 0 || splitIndex === totalChars) splitIndex = midPoint;

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

