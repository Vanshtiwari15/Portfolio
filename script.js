// ============================================
// Animated Background - Particle System
// ============================================
const particleCanvas = document.getElementById('particleCanvas');
const particleCtx = particleCanvas?.getContext('2d');

if (particleCanvas && particleCtx) {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
        }

        draw() {
            particleCtx.beginPath();
            particleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            particleCtx.fillStyle = 'rgba(99, 102, 241, 0.6)';
            particleCtx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    particleCtx.beginPath();
                    particleCtx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / connectionDistance)})`;
                    particleCtx.lineWidth = 0.5;
                    particleCtx.moveTo(particles[i].x, particles[i].y);
                    particleCtx.lineTo(particles[j].x, particles[j].y);
                    particleCtx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });
}

// ============================================
// Matrix Code Rain Effect
// ============================================
// const codeCanvas = document.getElementById('codeRainCanvas');
// const codeCtx = codeCanvas?.getContext('2d');

// if (codeCanvas && codeCtx) {
//     codeCanvas.width = window.innerWidth;
//     codeCanvas.height = window.innerHeight;

//     const codeChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
//     const fontSize = 14;
//     const columns = Math.floor(codeCanvas.width / fontSize);
//     const drops = Array(columns).fill(1);

//     function drawCodeRain() {
//         codeCtx.fillStyle = 'rgba(10, 10, 15, 0.05)';
//         codeCtx.fillRect(0, 0, codeCanvas.width, codeCanvas.height);

//         codeCtx.fillStyle = '#6366f1';
//         codeCtx.font = `${fontSize}px monospace`;

//         for (let i = 0; i < drops.length; i++) {
//             const text = codeChars[Math.floor(Math.random() * codeChars.length)];
//             const x = i * fontSize;
//             const y = drops[i] * fontSize;

//             codeCtx.fillText(text, x, y);

//             if (y > codeCanvas.height && Math.random() > 0.975) {
//                 drops[i] = 0;
//             }

//             drops[i]++;
//         }
//     }

//     setInterval(drawCodeRain, 50);

//     window.addEventListener('resize', () => {
//         codeCanvas.width = window.innerWidth;
//         codeCanvas.height = window.innerHeight;
//     });
// }

// Smooth scrolling for navigation links
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

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('mobile-active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.project-card, .research-card, .skill-category, .timeline-item, .club-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effect to project images (generate random gradient on hover)
const projectImages = document.querySelectorAll('.project-image');
projectImages.forEach(image => {
    image.addEventListener('mouseenter', function () {
        const hue = Math.floor(Math.random() * 360);
        this.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 50%) 0%, hsl(${hue + 60}, 70%, 50%) 100%)`;
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = `${1 - scrolled / 700}`;
    }
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const copyrightText = document.querySelector('.footer-copyright');
if (copyrightText) {
    copyrightText.textContent = `© ${currentYear} ML Engineer Portfolio. All rights reserved.`;
}

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Add cursor animation for code-style elements
const codeElements = document.querySelectorAll('.tech-badge, .skill-tag');
codeElements.forEach(el => {
    el.addEventListener('mouseenter', function () {
        this.style.letterSpacing = '0.5px';
    });
    el.addEventListener('mouseleave', function () {
        this.style.letterSpacing = 'normal';
    });
});

console.log('🧠 ML Engineer Portfolio loaded successfully!');
