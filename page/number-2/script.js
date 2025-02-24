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
