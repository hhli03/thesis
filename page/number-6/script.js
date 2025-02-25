document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const bodyTextContainer = document.querySelector('.body-text');
    const isBodyTextScrollable = bodyTextContainer.scrollHeight > bodyTextContainer.clientHeight;

    // Scroll to Top Functionality
    scrollToTopBtn.addEventListener('click', function() {
        if (isBodyTextScrollable) {
            // Scroll the .body-text container to the top
            bodyTextContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback: Scroll the main window to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Show or hide the scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100 || bodyTextContainer.scrollTop > 100) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // If .body-text is scrollable, listen to its scroll event
    if (isBodyTextScrollable) {
        bodyTextContainer.addEventListener('scroll', function() {
            if (bodyTextContainer.scrollTop > 100) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
    }
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
            subHeading.innerHTML = `&emsp;${originalText}`;

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
                subHeading.innerHTML = `&emsp;${firstLine}<br>&emsp;${secondLine}`;
            }
        });
    };

    // Initial execution
    adjustSubHeadings();

    // Recalculate on window resize
    window.addEventListener('resize', adjustSubHeadings);
});

// JavaScript to replace all &emsp; with &emsp;&emsp; on mobile devices
window.addEventListener('load', function() {
    if (window.innerWidth <= 768) {  // Check for mobile screen size
        // Get all elements containing text
        const elements = document.querySelectorAll('span, p, div');  // You can add more selectors as needed
        
        elements.forEach(function(element) {
            // Get the current content of the element
            let content = element.innerHTML;
            
            // Replace the em spaces (non-breaking spaces) with double em spaces
            content = content.replace(/&emsp;/g, '&emsp;&emsp;');
            
            // Update the element's content
            element.innerHTML = content;
        });
    }
});

