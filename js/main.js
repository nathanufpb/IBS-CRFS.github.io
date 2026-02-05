// Main JavaScript file for IBS-CRFS website
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current page navigation link
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentLocation) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle (if needed in future)
    // This is a placeholder for potential mobile menu functionality
    console.log('IBS-CRFS website loaded successfully');
});
