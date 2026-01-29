// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
    
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations with enhanced timing
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add extra animation trigger for special elements
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            } else if (entry.target.classList.contains('timeline-content')) {
                entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
            } else if (entry.target.classList.contains('education-card')) {
                entry.target.style.animation = 'flipIn 0.8s ease-out forwards';
            } else if (entry.target.classList.contains('contact-card')) {
                entry.target.style.animation = 'zoomIn 0.6s ease-out forwards';
            }
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .skill-category, .contact-card, .timeline-content, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Add typing effect to hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
const subtitleText = heroSubtitle.textContent;
let index = 0;

function typeWriter() {
    if (index < subtitleText.length) {
        heroSubtitle.textContent = subtitleText.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Uncomment to enable typing effect
// heroSubtitle.textContent = '';
// typeWriter();

// Particle background effect (optional)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(99, 102, 241, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.zIndex = '0';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    particle.animate([
        { opacity: 0, transform: 'translateY(0px)' },
        { opacity: 1, transform: 'translateY(-100px)' },
        { opacity: 0, transform: 'translateY(-200px)' }
    ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'ease-in-out'
    }).onfinish = () => {
        particle.remove();
        createParticle();
    };
}

// Create initial particles
// Uncomment to enable particle effect
// for (let i = 0; i < 50; i++) {
//     setTimeout(createParticle, Math.random() * 5000);
// }

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Section Reveal Animation
const revealSections = document.querySelectorAll('section');
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15,
});

revealSections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Add tilt effect to cards on mouse move
document.querySelectorAll('.project-card, .education-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Animated skill tags on scroll into view
const skillTags = document.querySelectorAll('.skill-tag');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'popIn 0.5s ease-out forwards';
            }, index * 50);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillTags.forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0)';
    skillObserver.observe(tag);
});

// Add CSS for popIn animation
const popInStyle = document.createElement('style');
popInStyle.textContent = `
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu a.active {
        color: var(--primary-color);
    }
    
    .nav-menu a.active::before {
        width: 100%;
    }
`;
document.head.appendChild(popInStyle);

// Magnetic button effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Smooth reveal for section titles
document.querySelectorAll('.section-title').forEach(title => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInDown 0.8s ease-out, expandWidth 1s ease-out 0.3s';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(title);
});

// Add sparkle effect on random intervals
setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #018ABE;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: sparkle 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}, 3000);

const sparkleKeyframes = document.createElement('style');
sparkleKeyframes.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(sparkleKeyframes);

// Add loading animation on page load
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #001B48 0%, #02457A 100%);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 80px; height: 80px; border: 4px solid rgba(1, 138, 190, 0.2); border-top: 4px solid #018ABE; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="color: #018ABE; margin-top: 20px; font-size: 1.2rem; font-weight: 600;">Loading...</p>
        </div>
    `;
    
    document.body.prepend(loader);
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            document.body.style.overflow = 'auto';
        }, 500);
    }, 1500);
});

// Console message for developers
console.log('%c👋 Hello, fellow developer!', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/taimoorsaqib1', 'color: #8b5cf6; font-size: 14px;');

// Particle Canvas Animation
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
            this.opacity = Math.random();
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            this.draw();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typing Effect for Hero Title
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.getAttribute('data-text') || 'Taimoor Saqib';
    let index = 0;
    typingText.textContent = '';
    
    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 500);
}

// Create floating background particles
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = (Math.random() - 0.5) * 200;
        const endY = -Math.random() * 500 - 200;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}px;
            top: ${startY}px;
            background: ${Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --tx: ${endX}px;
            --ty: ${endY}px;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

createFloatingParticles();

// Animated cursor trail effect
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length === 0 && window.innerWidth > 768) {
    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, #06b6d4, #8b5cf6);
            pointer-events: none;
            opacity: 0;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(circle);
    }
}

const allCircles = document.querySelectorAll('.circle');

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    allCircles.forEach((circle, index) => {
        circle.style.left = x - 4 + 'px';
        circle.style.top = y - 4 + 'px';
        circle.style.opacity = (20 - index) / 20;
        circle.style.transform = `scale(${(20 - index) / 20})`;
        
        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.offsetLeft - circle.offsetLeft) * 0.3;
        y += (nextCircle.offsetTop - circle.offsetTop) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

if (allCircles.length > 0) {
    animateCircles();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

// Add floating animation to random elements
setInterval(() => {
    const icons = document.querySelectorAll('.project-icon, .education-icon');
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    if (randomIcon) {
        randomIcon.style.animation = 'none';
        setTimeout(() => {
            randomIcon.style.animation = 'float 3s ease-in-out';
        }, 10);
    }
}, 5000);

// Add CSS for float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
