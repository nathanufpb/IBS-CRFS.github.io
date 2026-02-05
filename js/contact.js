// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real implementation, this would send data to a server
            // For now, we'll just show a confirmation message
            alert('Thank you for your message! We will get back to you soon.\n\nNote: This is a demo form. In production, this would send your message to our team.');
            
            // Reset form
            contactForm.reset();
            
            // Log form data (for development purposes)
            console.log('Form submitted:', formData);
        });
    }
});
