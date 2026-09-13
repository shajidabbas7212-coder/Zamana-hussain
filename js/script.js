// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navMenu.style.display = 'none';
        }
    });
});

// Active Nav Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Save to localStorage
        let messages = localStorage.getItem('contactMessages');
        messages = messages ? JSON.parse(messages) : [];
        messages.push({
            ...formData,
            timestamp: new Date().toLocaleString('ur-PK')
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        // Show success message
        alert('✅ شکریہ! آپ کا پیغام بھیج دیا گیا۔\nہم جلد آپ سے رابطہ کریں گے۔');
        contactForm.reset();
        console.log('رابطہ کی معلومات:', formData);
    });
}

// Smooth Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const cards = document.querySelectorAll('.service-card, .portfolio-item, .team-card, .blog-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.animation = 'slideIn 0.6s ease-out forwards';
    observer.observe(card);
});

// Add CSS Animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);