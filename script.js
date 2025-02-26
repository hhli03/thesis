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

    // Scroll to Top and Refresh Page on Icon Click
    const icon = document.querySelector('.icon');
    if (icon) {
        icon.addEventListener('click', function() {
            window.scrollTo(0, 0);  // Scroll to the top instantly
            location.reload();      // Refreshes the page
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const carouselImages = document.querySelectorAll('.carousel-track a img');

    carouselImages.forEach(img => {
        img.addEventListener('mousemove', (event) => {
            // Get image container and position
            const rect = img.getBoundingClientRect();
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const containerWidth = rect.width;
            const containerHeight = rect.height;

            // Calculate image aspect ratios
            const imgRatio = naturalWidth / naturalHeight;
            const containerRatio = containerWidth / containerHeight;

            let visibleWidth, visibleHeight;
            
            // Determine visible dimensions
            if (imgRatio > containerRatio) {
                // Image is wider than container
                visibleWidth = containerWidth;
                visibleHeight = containerWidth / imgRatio;
            } else {
                // Image is taller than container
                visibleHeight = containerHeight;
                visibleWidth = containerHeight * imgRatio;
            }

            // Calculate padding space around the image
            const paddingX = (containerWidth - visibleWidth) / 2;
            const paddingY = (containerHeight - visibleHeight) / 2;

            // Get mouse position relative to image container
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if mouse is within the visible part of the image
            if (
                mouseX > paddingX && 
                mouseX < (containerWidth - paddingX) &&
                mouseY > paddingY && 
                mouseY < (containerHeight - paddingY)
            ) {
                // Pointer is on the visible image part
                img.style.cursor = 'pointer';
                img.closest('a').style.pointerEvents = 'auto'; // Enable link
            } else {
                // Pointer is on the transparent padding
                img.style.cursor = 'default';
                img.closest('a').style.pointerEvents = 'none'; // Disable link
            }
        });

        // Reset cursor and disable link when mouse leaves the image container
        img.addEventListener('mouseleave', () => {
            img.style.cursor = 'default';
            img.closest('a').style.pointerEvents = 'none';
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    // Create a single floating label for fig numbers
    const figLabel = document.createElement('div');
    figLabel.classList.add('fig-label');
    document.body.appendChild(figLabel);

    // Get all images with data-fig attribute inside carousels
    const carouselImages = document.querySelectorAll('.carousel-track img[data-fig]');

    carouselImages.forEach(img => {
        img.addEventListener('mousemove', (event) => {
            // Get image container and position
            const rect = img.getBoundingClientRect();
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const containerWidth = rect.width;
            const containerHeight = rect.height;

            // Calculate image aspect ratios
            const imgRatio = naturalWidth / naturalHeight;
            const containerRatio = containerWidth / containerHeight;

            let visibleWidth, visibleHeight;
            
            // Determine visible dimensions
            if (imgRatio > containerRatio) {
                // Image is wider than container
                visibleWidth = containerWidth;
                visibleHeight = containerWidth / imgRatio;
            } else {
                // Image is taller than container
                visibleHeight = containerHeight;
                visibleWidth = containerHeight * imgRatio;
            }

            // Calculate padding space around the image
            const paddingX = (containerWidth - visibleWidth) / 2;
            const paddingY = (containerHeight - visibleHeight) / 2;

            // Get mouse position relative to image container
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if mouse is within the visible part of the image
            if (
                mouseX > paddingX && 
                mouseX < (containerWidth - paddingX) &&
                mouseY > paddingY && 
                mouseY < (containerHeight - paddingY)
            ) {
                // Pointer is on the visible image part
                img.style.cursor = 'pointer';
                img.closest('a').style.pointerEvents = 'auto'; // Enable link
                
                // Show fig label only when on visible image area
                const figNumber = img.getAttribute('data-fig');
                figLabel.innerText = figNumber;
                figLabel.style.display = 'block';
                figLabel.style.left = `${event.pageX + 10}px`;
                figLabel.style.top = `${event.pageY + 10}px`;
            } else {
                // Pointer is on the transparent padding
                img.style.cursor = 'default';
                img.closest('a').style.pointerEvents = 'none'; // Disable link

                // Hide fig label when on padding
                figLabel.style.display = 'none';
            }
        });

        // Reset cursor and disable link when mouse leaves the image container
        img.addEventListener('mouseleave', () => {
            img.style.cursor = 'default';
            img.closest('a').style.pointerEvents = 'none';
            figLabel.style.display = 'none';
        });
    });
});

