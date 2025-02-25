document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const bodyText = document.querySelector('.body-text');
    const gridContainer = document.querySelector('.grid-container');

    // Function to check scroll position and toggle button visibility
    function checkScrollPosition(scrollElement) {
        if (scrollElement.scrollTop > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    }

    // Function to scroll to top smoothly
    function scrollToTop(scrollElement) {
        scrollElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event Listener for Scroll-to-Top Button
    scrollToTopButton.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // Mobile: Scroll .grid-container
            scrollToTop(gridContainer);
        } else {
            // Desktop: Scroll .body-text
            scrollToTop(bodyText);
        }
    });

    // Event Listener for Scrolling
    if (window.innerWidth <= 768) {
        // Mobile: Listen to scroll event on .grid-container
        gridContainer.addEventListener('scroll', function() {
            checkScrollPosition(gridContainer);
        });
    } else {
        // Desktop: Listen to scroll event on .body-text
        bodyText.addEventListener('scroll', function() {
            checkScrollPosition(bodyText);
        });
    }
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
