document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen Logic (Using window 'load' for full resource loading with a safety fallback)
    const splashScreen = document.getElementById('splash-screen');
    
    const hideSplash = () => {
        if (splashScreen && !splashScreen.classList.contains('splash-hidden')) {
            splashScreen.classList.add('splash-hidden');
        }
    };

    // Attempt to hide on window load
    window.addEventListener('load', () => {
        setTimeout(hideSplash, 1500); // Small delay after load for smoothness
    });

    // Safety fallback: Hide splash screen after 5 seconds maximum regardless of load status
    setTimeout(hideSplash, 5000);

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
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
 
    // Target all major sections and components for a site-wide animation feel
    const revealElements = document.querySelectorAll(
        '.approach-section, .offerings-section-dark, .tech-section, .thinkers-section, ' +
        '.why-choose-us-section, .footer, .approach-card, .offering-item, .tech-table-grid'
    );
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });


    // Generic Counter Animation
    const animateCounters = (elements) => {
        elements.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const duration = 2000; // 2 seconds
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const updateCount = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(updateCount);
                    // Add suffix based on context
                    const label = counter.nextElementSibling ? counter.nextElementSibling.innerText : '';
                    if (label.includes('Satisfaction') || counter.closest('.achievements')) {
                         counter.innerText = target + (label.includes('Satisfaction') ? '%' : '');
                    } else {
                         counter.innerText = target + '+';
                    }
                    // Specific override for reliability
                    if (target === 100 && label.includes('Satisfaction')) counter.innerText = '100%';
                    if (target === 100 && label.includes('Delivered')) counter.innerText = '100+';
                    if (target === 50) counter.innerText = '50+';
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }, stepTime);
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number, .stat-num-bold');
                animateCounters(counters);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.achievements, .we-deliver').forEach(section => {
        statsObserver.observe(section);
    });

    // Hero Video Playlist Logic
    const videoPlayer = document.getElementById('hero-player');
    const playlist = ['hero 1.mp4', 'hero2.mp4', 'hero 3.mp4', 'hero 5.mp4', 'hero 6.mp4', 'hero 7.mp4', 'hero 8 .mp4', 'hero 9.mp4'];
    let currentVideoIndex = 0;

    if (videoPlayer) {
        videoPlayer.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
            videoPlayer.src = playlist[currentVideoIndex];
            videoPlayer.load();
            videoPlayer.play();
        });
    }

    // Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const manageBtn = document.getElementById('cookie-manage');

    if (cookieBanner) {
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('cookie-consent');
        
        if (!cookieChoice) {
            // Show banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000);
        }

        const hideBanner = () => {
            cookieBanner.classList.remove('show');
        };

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'accepted');
            hideBanner();
        });

        rejectBtn.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'rejected');
            hideBanner();
        });

        manageBtn.addEventListener('click', () => {
            alert('Cookie Preferences Managed. (This is a demonstration - in a real app, this would open a detailed settings modal)');
            localStorage.setItem('cookie-consent', 'managed');
            hideBanner();
        });
    }
});

// Services Slider & Filter Logic
window.slideServices = function(direction) {
    const slider = document.getElementById('servicesSlider');
    if (!slider) return;
    
    // Calculate card width dynamically (card width + gap)
    const card = slider.querySelector('.service-card-new:not(.hidden-item)');
    if (card) {
        const scrollAmount = card.offsetWidth + 24; 
        slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
};

window.filterServices = function(category, btn) {
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('.service-card-new');
    const slider = document.getElementById('servicesSlider');
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden-item');
        } else {
            card.classList.add('hidden-item');
        }
    });

    // Reset slider position to start when filtering
    if (slider) slider.scrollLeft = 0;
};

// Scrollbar Thumb Progress
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('servicesSlider');
    const thumb = document.getElementById('sliderThumb');

    if (slider && thumb) {
        const scrollbarContainer = thumb.parentElement;
        
        slider.addEventListener('scroll', () => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            if (maxScroll <= 5) {
                if (scrollbarContainer) scrollbarContainer.style.opacity = '0';
                return;
            }
            
            if (scrollbarContainer) scrollbarContainer.style.opacity = '1';
            
            const scrollPercentage = (slider.scrollLeft / maxScroll) * 100;
            const thumbWidth = (slider.clientWidth / slider.scrollWidth) * 100;
            
            thumb.style.width = thumbWidth + '%';
            thumb.style.left = (scrollPercentage * (100 - thumbWidth) / 100) + '%';
        });

        // Trigger once to set initial state
        slider.dispatchEvent(new Event('scroll'));
    }
});
