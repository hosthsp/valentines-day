document.addEventListener('DOMContentLoaded', () => {
    // Kalp yağmuru oluşturma fonksiyonu
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7 saniye arası
        heart.style.opacity = Math.random() * 0.3 + 0.2; // 0.2-0.5 arası opaklık
        
        document.querySelector('.hearts-bg').appendChild(heart);
        
        // Animasyon bitince kalbi kaldır
        setTimeout(() => {
            heart.remove();
        }, parseFloat(heart.style.animationDuration) * 1000);
    }

    // Her 2 saniyede bir yeni kalp oluştur
    setInterval(createHeart, 2000);

    // Başlangıçta birkaç kalp oluştur
    for(let i = 0; i < 5; i++) {
        setTimeout(createHeart, Math.random() * 2000);
    }

    const gridItems = document.querySelectorAll('.grid-item');
    const imageDisplay = document.getElementById('image-display');
    const displayedImage = document.getElementById('displayed-image');
    const locationButton = document.querySelector('.location-button');
    let activeItem = null;

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const number = item.getAttribute('data-number');
            const location = item.getAttribute('data-location');
            
            if (activeItem === item) {
                // Aynı kutuya tekrar tıklanırsa kapat
                imageDisplay.classList.remove('active');
                displayedImage.src = '';
                activeItem = null;
                return;
            }

            // Dal resmini göster
            displayedImage.src = `images/${number}.jpeg`;
            imageDisplay.classList.add('active');
            activeItem = item;

            // Lokasyon butonunu güncelle
            locationButton.onclick = () => {
                window.open(location, '_blank');
            };

            // Görüntü alanına smooth scroll
            setTimeout(() => {
                const rect = item.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                imageDisplay.style.width = window.innerWidth > 768 ? '100%' : 'calc(100% - 20px)';
                
                window.scrollTo({
                    top: rect.bottom + scrollTop,
                    behavior: 'smooth'
                });
            }, 100);
        });
    });

    // Kalp animasyonu için
    const heartIcon = document.querySelector('.heart-icon');
    heartIcon.addEventListener('click', () => {
        heartIcon.style.transform = 'scale(1.5)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 200);
    });
}); 