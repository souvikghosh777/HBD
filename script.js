// Galaxy Theme Birthday Website - JavaScript (NO FLOATING HEARTS)

const CONFIG = {
    birthdayDate: '2026-05-10',
    herName: 'Beautiful',
    yourName: '[Souvik]',
    musicFile: 'music.mp3'
};

document.addEventListener('DOMContentLoaded', function() {
    initFloatingHearts();
    initCountdown();
    initMusicControl();
    initHeartPortal();
    initMemoryCards();
    initMotivationBook();
    updateNameInHTML();
});

// Floating Hearts Animation
function initFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💗', '🥰', '😍'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 10) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 1500);
    
    // Create initial hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 300);
    }
}

function initCountdown() {
    const birthdayDate = new Date(CONFIG.birthdayDate).setHours(0, 0, 0, 0);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;
        
        const countdownContainer = document.querySelector('.countdown-container');
        const birthdayMessage = document.getElementById('birthdayMessage');
        const today = new Date().setHours(0, 0, 0, 0);
        
        if (today === birthdayDate) {
            countdownContainer.style.display = 'none';
            birthdayMessage.classList.add('show');
            return;
        }
        
        if (distance < 0) {
            countdownContainer.style.display = 'none';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initMusicControl() {
    const musicControl = document.getElementById('musicControl');
    const musicText = document.getElementById('musicText');
    const musicPlayIcon = document.getElementById('musicPlayIcon');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;
    
    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicControl.classList.remove('playing');
            musicPlayIcon.textContent = '▶️';
            musicText.textContent = 'Play Music';
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(error => {
                console.log('Music autoplay prevented');
            });
            musicControl.classList.add('playing');
            musicPlayIcon.textContent = '⏸️';
            musicText.textContent = 'Pause Music';
            isPlaying = true;
        }
    });
}

function initHeartPortal() {
    const heartPortal = document.getElementById('heartPortal');
    const heroSection = document.querySelector('.hero-section');
    const mainContent = document.getElementById('mainContent');
    
    heartPortal.addEventListener('click', function() {
        heartPortal.style.transform = 'scale(0)';
        heartPortal.style.opacity = '0';
        
        createPortalEffect();
        
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease';
            heroSection.style.opacity = '0';
            
            setTimeout(() => {
                heroSection.style.display = 'none';
                mainContent.classList.add('show');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        }, 500);
    });
}

function createPortalEffect() {
    const portal = document.createElement('div');
    portal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 110, 199, 0.8), rgba(77, 159, 255, 0.8));
        animation: portalExpand 1s ease forwards;
        z-index: 9999;
        pointer-events: none;
    `;
    
    document.body.appendChild(portal);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes portalExpand {
            0% {
                width: 100px;
                height: 100px;
                opacity: 1;
            }
            100% {
                width: 200vw;
                height: 200vh;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        portal.remove();
        style.remove();
    }, 1000);
}

function initMemoryCards() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    targetSection.style.transition = 'all 0.5s ease';
                    targetSection.style.boxShadow = '0 0 40px rgba(255, 110, 199, 0.6)';
                    setTimeout(() => {
                        targetSection.style.boxShadow = '';
                    }, 2000);
                }, 300);
            }
        });
    });
}

function updateNameInHTML() {
    const typewriterName = document.querySelector('.highlight-name');
    if (typewriterName && CONFIG.herName) {
        typewriterName.textContent = CONFIG.herName;
    }
    
    const footerName = document.querySelector('.footer-name');
    if (footerName && CONFIG.yourName) {
        footerName.textContent = CONFIG.yourName;
    }
}

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.stars, .stars2, .stars3');
    
    stars.forEach((star, index) => {
        const speed = (index + 1) * 0.05;
        star.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

let clickCount = 0;
document.addEventListener('click', function(e) {
    clickCount++;
    
    if (clickCount % 5 === 0) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 10000;
        animation: sparkleFloat 1s ease forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, -50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Motivational Book Function
function initMotivationBook() {
    const motivationBtn = document.getElementById('motivationBookBtn');
    
    const motivationalQuotes = [
        "You are loved more than you know. Happy Birthday! 💖",
        "Today celebrates the amazing person you are! ✨",
        "Your smile lights up every room. Keep shining! 🌟",
        "Every moment with you is a gift. Thank you for being you! 🎁",
        "You make the world beautiful just by being in it! 🌸",
        "May this year bring you endless joy and love! 💝",
        "You deserve all the happiness in the world! 🌈",
        "Your kindness and beauty inspire everyone around you! 💫",
        "Keep being amazing, because that's exactly what you are! ⭐",
        "Life is better with you in it. Happy Birthday! 🎉",
        "You are stronger than you think and braver than you believe! 💪",
        "Your presence is a present to everyone who knows you! 🎀"
    ];
    
    if (motivationBtn) {
        motivationBtn.addEventListener('click', function() {
            const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'motivation-modal';
            modal.innerHTML = `
                <div class="motivation-modal-content">
                    <span class="modal-close">&times;</span>
                    <div class="modal-book-icon">📖</div>
                    <h2 class="modal-title">A Message For You</h2>
                    <p class="modal-quote">${randomQuote}</p>
                    <button class="modal-another-btn">Read Another 📚</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add styles for modal
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .motivation-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: modalFadeIn 0.3s ease;
                }
                
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .motivation-modal-content {
                    background: linear-gradient(135deg, #1a1435, #2d1b4e);
                    border: 2px solid rgba(255, 110, 199, 0.5);
                    border-radius: 20px;
                    padding: 50px 40px;
                    max-width: 600px;
                    width: 90%;
                    text-align: center;
                    position: relative;
                    animation: modalSlideIn 0.4s ease;
                    box-shadow: 0 20px 60px rgba(255, 110, 199, 0.3);
                }
                
                @keyframes modalSlideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 35px;
                    color: rgba(255, 255, 255, 0.7);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .modal-close:hover {
                    color: #ff6ec7;
                    transform: rotate(90deg);
                }
                
                .modal-book-icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    animation: bookOpen 0.6s ease;
                }
                
                @keyframes bookOpen {
                    0% { transform: scale(0) rotate(-180deg); }
                    100% { transform: scale(1) rotate(0); }
                }
                
                .modal-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    background: linear-gradient(135deg, #ff6ec7, #ffd700);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 30px;
                }
                
                .modal-quote {
                    font-size: 1.3rem;
                    line-height: 1.8;
                    color: #fff;
                    margin-bottom: 30px;
                    font-weight: 300;
                }
                
                .modal-another-btn {
                    background: linear-gradient(135deg, #ff6ec7, #4d9fff);
                    border: none;
                    padding: 15px 35px;
                    border-radius: 50px;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 110, 199, 0.3);
                }
                
                .modal-another-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(255, 110, 199, 0.5);
                }
                
                @media (max-width: 768px) {
                    .motivation-modal-content {
                        padding: 40px 25px;
                    }
                    
                    .modal-title {
                        font-size: 1.5rem;
                    }
                    
                    .modal-quote {
                        font-size: 1.1rem;
                    }
                }
            `;
            document.head.appendChild(modalStyle);
            
            // Animate in
            setTimeout(() => modal.style.opacity = '1', 10);
            
            // Close modal
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.style.animation = 'modalFadeIn 0.3s ease reverse';
                setTimeout(() => modal.remove(), 300);
            });
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.animation = 'modalFadeIn 0.3s ease reverse';
                    setTimeout(() => modal.remove(), 300);
                }
            });
            
            // Another quote button
            const anotherBtn = modal.querySelector('.modal-another-btn');
            anotherBtn.addEventListener('click', () => {
                modal.remove();
                motivationBtn.click();
            });
        });
    }
}

console.log('%c💖 Happy Birthday! 💖', 'font-size: 30px; color: #ff6ec7; font-weight: bold;');
