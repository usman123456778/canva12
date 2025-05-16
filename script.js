document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 80, // Trigger a bit earlier
    });

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('.navbar nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navUl.classList.contains('active'));
        });
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Active Navigation Link Highlighting ---
    // This function is good as is from your provided script.js

    // --- Sticky Navbar with Shadow on Scroll ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Old Animated Background Shapes (Consider Removing if using particles.js everywhere) ---
    const animatedBgContainer = document.getElementById('global-animated-bg'); // Target specific ID
    if (animatedBgContainer && !document.querySelector('[data-particle-bg]')) { // Only run if no particle sections
        const createShape = () => {
            const shape = document.createElement('div');
            shape.classList.add('bg-shape');
            const size = Math.random() * 80 + 40; // Smaller shapes
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            shape.style.setProperty('--x-end', `${Math.random() * 100}vw`);
            shape.style.setProperty('--y-end', `${Math.random() * 100}vh`);
            const duration = Math.random() * 20 + 20; // 20s to 40s
            shape.style.animationDuration = `${duration}s`;
            shape.style.animationDelay = `${Math.random() * 10}s`;
            shape.style.backgroundColor = `hsla(${Math.random() * 360}, 70%, 80%, 0.5)`; // Random soft colors
            animatedBgContainer.appendChild(shape);

            setTimeout(() => {
                shape.remove();
            }, duration * 1000 + parseFloat(shape.style.animationDelay.replace('s','')) * 1000 + 1000);
        };
        if (window.innerWidth > 768) { // Only on larger screens
             for (let i = 0; i < 15; i++) { createShape(); } // More initial shapes
        }
    }

    // --- Testimonial Slider (Basic Functionality remains, ensure your HTML/CSS supports it as scrollable flex) ---
    // Your existing basic logic for the testimonial slider is fine for a scrollable flex container.
    // For actual sliding, a library like SwiperJS is recommended.

    // --- Contact Form Submission (Borcelle) ---
    const contactFormBorcelle = document.getElementById('contactFormBorcelle');
    if (contactFormBorcelle) {
        contactFormBorcelle.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            // Simulate sending
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                console.log('Borcelle Contact Form Submitted:', { name, email, subject: this.subject.value.trim(), message });
                alert('Thank you for your message! We will get back to you soon. (Demo)');
                this.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // --- Dynamic Copyright Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Particles.js Initialization for BORCELLE ---
    function initBorcelleParticles() {
        if (typeof particlesJS === 'undefined' || window.innerWidth <= 768) {
            // Remove any existing particle canvases if on mobile or particlesJS not loaded
            document.querySelectorAll('div[id$="-borcelle-particles"]').forEach(div => div.innerHTML = '');
            document.querySelectorAll('.particles-js-canvas-el').forEach(canvas => canvas.remove());
            return;
        }

        const particleSections = document.querySelectorAll('[data-particle-bg]');
        const particleConfigPath = 'borcelle-particles-bg.json'; // Single config for Borcelle theme

        particleSections.forEach(section => {
            const particleId = section.id + '-borcelle-particles'; // Unique ID
            let particleDiv = document.getElementById(particleId);

            // Clean up previous instance if exists
            if (window.pJSDom && window.pJSDom[particleId]) {
                window.pJSDom[particleId].pJS.fn.vendors.destroypJS();
                delete window.pJSDom[particleId];
            }
            if (particleDiv) {
                particleDiv.remove(); // Remove the div itself to ensure clean slate
            }

            particleDiv = document.createElement('div');
            particleDiv.id = particleId;
            section.insertBefore(particleDiv, section.firstChild); // Insert as first child

            fetch(particleConfigPath)
                .then(response => response.json())
                .then(config => {
                    // Customize config based on section or theme if needed here
                    // For Borcelle, the primary color is consistent.
                    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
                    config.particles.color.value = primaryColor;
                    
                    // Adjust particle count for different screen sizes (but still > 768px)
                    if (window.innerWidth < 1024 && window.innerWidth > 768) {
                        config.particles.number.value = Math.max(30, Math.floor(config.particles.number.value * 0.6));
                    } else {
                         config.particles.number.value = Math.max(50, Math.floor(config.particles.number.value * 0.8)); // Default for larger screens
                    }


                    particlesJS(particleId, config);
                })
                .catch(error => console.error('Error loading Borcelle particle config:', error, 'for', particleId));
        });
    }

    initBorcelleParticles(); // Initialize on page load
    window.addEventListener('resize', initBorcelleParticles); // Re-initialize on resize (e.g., if crossing mobile threshold)

});