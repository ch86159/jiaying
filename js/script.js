// 通用初始化函数
function initCarousel(containerId) {
    const container = document.getElementById(containerId);
    const track = container.querySelector('.carousel-track');
    const items = track.children;
    const indicators = container.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let autoPlayInterval;

    function update() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    function next() {
        currentIndex = (currentIndex + 1) % items.length;
        update();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(next, 3000);
    }

    // 绑定指示器事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            update();
        });
    });

    startAutoPlay();
}

// 初始化多个轮播
initCarousel('carousel1');
initCarousel('carousel2');