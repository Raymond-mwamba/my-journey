document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');

    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Handle navigation clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent click from bubbling
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');

                // Calculate scroll position
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                // Smooth scroll to section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Highlight active section while scrolling
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, header');
        const navHeight = document.querySelector('nav').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; // Offset for better activation
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Update active menu item
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}); 