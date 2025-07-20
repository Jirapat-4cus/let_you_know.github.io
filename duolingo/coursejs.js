let currentIndex = 0;
        const totalCards = 7;
        let autoSlideInterval;
        
        const cardData = [
            { title: "Full Stack Web Development", category: "Programming" },
            { title: "Mobile App Development", category: "Mobile Technology" },
            { title: "Data Science & Analytics", category: "Data & AI" },
            { title: "UI/UX Design Mastery", category: "Creative Design" },
            { title: "DevOps & Cloud Computing", category: "Infrastructure" },
            { title: "Cybersecurity Fundamentals", category: "Security" },
            { title: "AI & Machine Learning", category: "Artificial Intelligence" }
        ];

        function updateCarousel() {
            const cards = document.querySelectorAll('.card');
            
            cards.forEach((card, index) => {
                // ลบ class ตำแหน่งเก่า
                card.classList.remove('position-0', 'position-1', 'position-2', 'position-3', 'position-4');
                
                // คำนวณตำแหน่งใหม่
                let position = (index - currentIndex + totalCards) % totalCards;
                
                if (position <= 2) {
                    card.classList.add(`position-${position + 2}`);
                } else if (position === totalCards - 1) {
                    card.classList.add('position-1');
                } else if (position === totalCards - 2) {
                    card.classList.add('position-0');
                } else {
                    card.classList.add('position-0');
                }
            });
            
            updateInfo();
        }

        function updateInfo() {
            const currentCard = cardData[currentIndex];
            document.getElementById('currentInfo').textContent = 
                `${currentCard.title} - ${currentCard.category}`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
            highlightCenterCard();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
            highlightCenterCard();
        }

        function highlightCenterCard() {
            const centerCard = document.querySelector('.position-2');
            if (centerCard) {
                centerCard.style.transform = 'scale(1.05) rotateY(0deg) translateY(-25px)';
                setTimeout(() => {
                    centerCard.style.transform = 'scale(1) rotateY(0deg) translateY(-20px)';
                }, 300);
            }
        }

        function handleAction(action, cardIndex) {
            const card = cardData[cardIndex];
            
            // ตัวอย่างการทำงาน - คุณสามารถเปลี่ยนเป็น window.location.href หรือ function อื่นๆ
            switch(action) {
        case 'enroll':
        case 'join':
        case 'start':
        case 'register':
        case 'begin':
        case 'secure':
        case 'explore':
            // ไปหน้า course เฉพาะของแต่ละ course
            switch(cardIndex) {
                case 0: // Web Development
                    window.location.href = 'engineering.html';
                    break;
                case 1: // Mobile App
                    window.location.href = '#';
                    break;
                case 2: // Data Science
                    window.location.href = '#';
                    break;
                case 3: // UI/UX Design
                    window.location.href = '#';
                    break;
                case 4: // DevOps
                    window.location.href = '#';
                    break;
                case 5: // Cybersecurity
                    window.location.href = '#';
                    break;
                case 6: // AI/ML
                    window.location.href = '#';
                    break;
                default:
                    window.location.href = 'course.html';
            }
            break;
            }
        }


        // Event Listeners
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                if (autoSlideInterval) {
                    stopAutoSlide();
                } else {
                    startAutoSlide();
                }
            }
        });

        // Click card to center it
        document.addEventListener('click', function(e) {
            if (e.target.closest('.card') && !e.target.closest('.btn')) {
                const card = e.target.closest('.card');
                const cardIndex = parseInt(card.dataset.index);
                currentIndex = cardIndex;
                updateCarousel();
                highlightCenterCard();
            }
        });

        // Touch/Swipe support
        let startX = 0;
        let endX = 0;

        document.querySelector('.carousel-container').addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        document.querySelector('.carousel-container').addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            const swipeThreshold = 50;
            
            if (startX - endX > swipeThreshold) {
                nextSlide();
            } else if (endX - startX > swipeThreshold) {
                prevSlide();
            }
        });

        // Initialize
        updateCarousel();