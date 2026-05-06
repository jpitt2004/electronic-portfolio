// ========================================
// Main JavaScript for Portfolio Website
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollAnimations();
    initResumeUpload();
    initContactForm();
});

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ========================================
// Resume Upload Functionality
// ========================================
function initResumeUpload() {
    const resumeInput = document.getElementById('resume-upload');
    const downloadBtn = document.getElementById('download-btn');
    
    if (resumeInput) {
        resumeInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.type !== 'application/pdf') {
                    alert('Please upload a PDF file.');
                    e.target.value = '';
                    return;
                }
                
                // Create object URL for the uploaded file
                const fileURL = URL.createObjectURL(file);
                downloadBtn.href = fileURL;
                downloadBtn.download = 'Jeniya_Pittman_Resume.pdf';
                downloadBtn.textContent = 'Download My Resume';
                
                // Show success message
                alert('Resume uploaded successfully! You can now download it.');
            }
        });
    }
}

// ========================================
// Contact Form Handling
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create mailto link (since there's no backend)
            const mailtoLink = `mailto:jpittman122@rams.wssu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your message! Your email client should open to send the message.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ========================================
// Navbar Scroll Effect
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(255, 182, 193, 0.25)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(255, 182, 193, 0.15)';
        }
    }
});

// ========================================
// Smooth Page Load Animation
// ========================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});