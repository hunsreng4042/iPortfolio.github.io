// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
    this.classList.toggle('fa-times');
});

// Typing animation
const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');

function typeWriter(text, i, callback) {
    if (i < text.length) {
        // Add "Hi, I'm " first
        if (i < 8) {
            typingText.innerHTML = text.substring(0, i+1);
        } 
        // Then add "Hun Sreng" with highlight class
        else {
            typingText.innerHTML = text.substring(0, 8) + 
                                 '<span class="highlight">' + 
                                 text.substring(8, i+1) + 
                                 '</span>';
        }
        setTimeout(function() {
            typeWriter(text, i + 1, callback);
        }, 100);
    } else if (typeof callback == 'function') {
        // Add animation to highlight when typing completes
        const highlight = document.querySelector('.highlight');
        highlight.classList.add('highlight-animate');
        setTimeout(() => {
            highlight.classList.remove('highlight-animate');
        }, 500);
        setTimeout(() => {
            // Instead of reversing, restart the animation after a delay
            startTypingAnimation();
        }, 2000); // Wait 2 seconds before restarting
    }
}

function startTypingAnimation() {
    const text = "Hi, I'm Hun Sreng";
    typingText.innerHTML = '';
    typeWriter(text, 0, function() {
        cursor.style.animation = 'none';
        setTimeout(() => {
            cursor.style.animation = 'blink 1s infinite';
        }, 500);
    });
}

// Start typing animation when page loads
window.addEventListener('DOMContentLoaded', function() {
    startTypingAnimation();
    animateOnScroll();
});

// Smooth scrolling for all links with hashes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Calculate the target position considering fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('active');
            document.querySelector('.mobile-menu').classList.remove('fa-times');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// Initialize EmailJS with your User ID
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("z5ZLt0_wlPtytpzkQ"); // Your EmailJS User ID

    // Create spinner element
    const spinnerOverlay = document.createElement('div');
    spinnerOverlay.className = 'spinner-overlay';
    spinnerOverlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(spinnerOverlay);
  
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            try {
                // Show spinner and disable button
                spinnerOverlay.classList.add('active');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Get current timestamp
                const now = new Date();
                const timestamp = now.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                // Prepare form data
                const formData = new FormData(this);
                formData.append('time', timestamp);
                
                // Send the form using EmailJS
                const response = await emailjs.send(
                    'service_79inyf3', 
                    'template_peqixry', 
                    Object.fromEntries(formData)
                );
                
                // Show success message
                showAlert('Message sent successfully!', 'success');
                this.reset();
                
            } catch (error) {
                console.error('EmailJS Error:', error);
                showAlert('Failed to send message. Please try again.', 'error');
            } finally {
                // Hide spinner and reset button
                spinnerOverlay.classList.remove('active');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});

// Function to show alert message
function showAlert(message, type) {
    // Check if an alert already exists and remove it
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span class="alert-icon">${type === 'success' ? '✓' : '✗'}</span>
        ${message}
        <span class="close-alert">&times;</span>
    `;
    
    document.body.appendChild(alert);
    
    // Show the alert
    setTimeout(() => {
        alert.classList.add('show');
    }, 100);
    
    // Close the alert after 5 seconds
    const autoClose = setTimeout(() => {
        closeAlert(alert);
    }, 5000);
    
    // Close on click
    alert.querySelector('.close-alert').addEventListener('click', () => {
        clearTimeout(autoClose);
        closeAlert(alert);
    });
}

function closeAlert(alertElement) {
    alertElement.classList.remove('show');
    setTimeout(() => {
        alertElement.remove();
    }, 300);
}
// Initialize animations when elements come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-item, .project-card, .experience-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Check for animations on scroll
window.addEventListener('scroll', animateOnScroll);

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('active');
            document.querySelector('.mobile-menu').classList.remove('fa-times');
        }
    });
});