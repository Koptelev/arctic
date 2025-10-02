// Arctic Expedition Landing Page JavaScript

// Snowflakes Animation
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeSymbols = ['✦', '✧', '✩', '✪', '✫', '✬'];
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        
        // Random position and size
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        
        snowflakesContainer.appendChild(snowflake);
        
        // Remove snowflake after animation
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 5000);
    }
    
    // Create snowflakes periodically
    setInterval(createSnowflake, 300);
}

// Aurora Effect Enhancement
function enhanceAuroraEffect() {
    const auroraBg = document.querySelector('.aurora-bg');
    
    // Add mouse movement effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        auroraBg.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
}


// Smooth Scrolling for CTA Buttons
function initSmoothScrolling() {
    // Hero CTA button
    const heroBtn = document.querySelector('.hero .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            document.getElementById('registration').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// Registration Form Handling - Removed (using external link)

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' : 
                     type === 'error' ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 
                     'linear-gradient(135deg, #3B82F6, #2563EB)'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-message {
            flex: 1;
            font-size: 0.95rem;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.station-card, .tip-card, .mission-accent, .prize-highlight');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax Effect for Hero
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Toggle Details Function
function toggleDetails(button) {
    const content = button.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all other detail sections in the same station
    const stationCard = button.closest('.station-card');
    const allToggles = stationCard.querySelectorAll('.detail-toggle');
    const allContents = stationCard.querySelectorAll('.detail-content');
    
    allToggles.forEach(toggle => toggle.classList.remove('active'));
    allContents.forEach(content => content.classList.remove('active'));
    
    // Toggle current section
    if (!isActive) {
        button.classList.add('active');
        content.classList.add('active');
    }
}

// Utility Functions
function scrollToRegistration() {
    document.getElementById('registration').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initNavigationScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Background Music Control
function initBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    
    if (audio) {
        // Set volume to 30% for background music
        audio.volume = 0.3;
        
        // Try to play music (may be blocked by browser autoplay policy)
        audio.play().catch(error => {
            console.log('Автовоспроизведение заблокировано браузером:', error);
        });
        
        // Handle user interaction to enable audio
        document.addEventListener('click', function() {
            if (audio.paused) {
                audio.play().catch(error => {
                    console.log('Ошибка воспроизведения:', error);
                });
            }
        }, { once: true });
    }
}

// Results Section - Animated Counters and Power BI Integration
function initResultsSection() {
    // Animate counters when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const resultsSection = document.querySelector('.results');
    if (resultsSection) {
        observer.observe(resultsSection);
    }
}

function animateCounters() {
    // Animate participants count
    animateCounter('participants-count', 0, 127, 2000, '');
    
    // Animate stations count
    animateCounter('stations-active', 0, 4, 1500, '');
    
    // Animate revenue
    animateCounter('revenue-amount', 0, 2500000, 2500, ' ₽');
    
    // Animate success rate
    animateCounter('success-rate', 0, 87, 1800, '%');
}

function animateCounter(elementId, start, end, duration, suffix) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        // Format number with spaces for thousands
        const formatted = current.toLocaleString('ru-RU');
        element.textContent = formatted + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Power BI Data Integration (placeholder for future implementation)
function loadPowerBIData() {
    // This function would integrate with Power BI REST API
    // For now, we'll use mock data that can be replaced with real API calls
    
    const mockData = {
        participants: 127,
        stations: 4,
        revenue: 2500000,
        successRate: 87
    };
    
    // Update counters with real data if available
    setTimeout(() => {
        document.getElementById('participants-count').textContent = mockData.participants.toLocaleString('ru-RU');
        document.getElementById('stations-active').textContent = mockData.stations;
        document.getElementById('revenue-amount').textContent = mockData.revenue.toLocaleString('ru-RU') + ' ₽';
        document.getElementById('success-rate').textContent = mockData.successRate + '%';
    }, 3000);
}

// Music control button removed - music plays automatically

// Background Image Rotation
function initBackgroundRotation() {
    const backgroundElements = [
        document.querySelector('.hero-bg-image'),
        // document.querySelector('.mission-bg-image'), // Fixed background - north-pole-igloos-hotel-noordpool-Pure-Luxe.jpg
        document.querySelector('.stations-bg-image'),
        document.querySelector('.tips-bg-image'),
        document.querySelector('.prizes-bg-image'),
        document.querySelector('.results-bg-image'),
        document.querySelector('.final-cta-bg-image')
    ];
    
    const backgrounds = [
        'fon/Обложка с иллюстрацией (7).png',
        'fon/Обложка с иллюстрацией (8).png'
    ];
    
    let currentIndex = 0;
    
    function rotateBackground() {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        const newBg = backgrounds[currentIndex];
        
        // Плавная смена фона для всех секций
        backgroundElements.forEach(element => {
            if (element) {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.backgroundImage = `url('${newBg}')`;
                    element.style.opacity = '1';
                }, 500);
            }
        });
    }
    
    // Меняем фон каждые 10 секунд
    setInterval(rotateBackground, 10000);
    
    // Добавляем плавные переходы для всех элементов
    backgroundElements.forEach(element => {
        if (element) {
            element.style.transition = 'opacity 0.5s ease-in-out';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add notification styles
    addNotificationStyles();
    
    // Initialize all features
    createSnowflakes();
    enhanceAuroraEffect();
    initBackgroundRotation();
    initMobileNavigation();
    initNavigationScrolling();
    initSmoothScrolling();
    // initRegistrationForm(); // Removed - using external link
    initScrollAnimations();
    initParallaxEffect();
    initBackgroundMusic(); // Initialize background music
    initResultsSection(); // Initialize results section with animated counters
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('Arctic Expedition Landing Page initialized successfully!');
});


// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    window.konamiCode = window.konamiCode || [];
    window.konamiCode.push(e.keyCode);
    
    if (window.konamiCode.length > konamiCode.length) {
        window.konamiCode.shift();
    }
    
    if (window.konamiCode.join(',') === konamiCode.join(',')) {
        showNotification('Секретный код активирован! Вы получили +100 очков к экспедиции!', 'success');
        window.konamiCode = [];
        
        // Add some fun effects
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
