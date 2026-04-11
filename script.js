document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }

    // Hero Canvas Particles
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(16, 185, 129, ' + (Math.random() * 0.4 + 0.1) + ')';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;

                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // Scroll Reveal Interaction
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.service-card, .team-card, .portfolio-card, .highlight-item, .section-title, .training-content, .training-visual');
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // Add necessary CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .reveal-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    // Achievements Counter Animation
    const counterStats = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counterStats.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const speed = 200; // Lower is faster
            const inc = target / speed;

            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + (counter.parentElement.innerText.includes('%') ? '%' : '+');
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger when visible
    const statsSection = document.querySelector('.achievements');
    const statsObserverOptions = { threshold: 0.5 };
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, statsObserverOptions);

    if (statsSection) statsObserver.observe(statsSection);

    // Hero Video Playlist Logic
    const videoPlayer = document.getElementById('hero-player');
    const playlist = ['hero1.mp4', 'hero2.mp4', 'hero 3.mp4', 'hero 5.mp4', 'hero 6.mp4', 'hero 7.mp4', 'hero 8 .mp4', 'hero 9.mp4'];
    let currentVideoIndex = 0;

    if (videoPlayer) {
        videoPlayer.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
            videoPlayer.src = playlist[currentVideoIndex];
            videoPlayer.load();
            videoPlayer.play();
        });
    }
});

// Services Slider Logic
window.slideServices = function(direction) {
    const slider = document.getElementById('servicesSlider');
    if (!slider) return;
    
    // Calculate card width dynamically (card width + gap)
    const card = slider.querySelector('.service-card-new');
    if (card) {
        // 24px matches the 1.5rem gap in CSS
        const scrollAmount = card.offsetWidth + 24; 
        slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
};
