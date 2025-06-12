document.addEventListener('DOMContentLoaded', () => {
    const welcomeText = document.getElementById('welcome-text');
    const openBtn = document.getElementById('open-btn');
    const box = document.getElementById('box');
    const cards = document.querySelectorAll('.card');
  
    welcomeText.classList.remove('opacity-0');
  
    openBtn.addEventListener('click', () => {
      box.classList.remove('hidden');
      box.classList.add('fade-in');
      box.scrollIntoView({ behavior: 'smooth' });
  
      // Запуск музыки по явному действию пользователя
      bgAudio.play().catch(() => {/* игнор */});
    });
  
    // Плавное раскрытие карточек
    cards.forEach(card => {
      const text = card.querySelector('p');
      // убедимся, что у параграфа есть классы анимации
      text.classList.add('transition-opacity', 'duration-500', 'opacity-0', 'hidden');
  
      card.addEventListener('click', () => {
        if (text.classList.contains('hidden')) {
          // показать
          text.classList.remove('hidden');
          // запускаем плавное появление
          requestAnimationFrame(() => text.classList.remove('opacity-0'));
        } else {
          // спрятать: сначала делаем прозрачным
          text.classList.add('opacity-0');
          text.addEventListener('transitionend', function handler() {
            text.classList.add('hidden');
            text.removeEventListener('transitionend', handler);
          });
        }
      });
    });
  
    // Улучшенный слайдер
    const slider = document.getElementById('slider');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');
  
    const slides = slider.querySelectorAll('img');
    let currentSlide = 0;
    let autoplay;
  
    // Создание точек навигации
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all';
      dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  
    function setActiveDot() {
      [...dotsContainer.children].forEach((dot, idx) => {
        dot.classList.toggle('bg-white', idx === currentSlide);
        dot.classList.toggle('bg-white/50', idx !== currentSlide);
      });
    }
  
    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      setActiveDot();
    }
  
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }
  
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }
  
    function startAutoplay() {
      autoplay = setInterval(nextSlide, 4000);
    }
  
    function stopAutoplay() {
      clearInterval(autoplay);
    }
  
    // Запуск
    goToSlide(0);
    startAutoplay();
  
    // События
    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
    slider.parentElement.addEventListener('mouseenter', stopAutoplay);
    slider.parentElement.addEventListener('mouseleave', startAutoplay);
  
    /* =========================
       Таймер до 10.07.2025
       =========================*/
    const targetDate = new Date('2025-07-10T00:00:00');
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    const countdownContainer = document.getElementById('countdown');
  
    function updateCountdown() {
      const now = new Date();
      let diff = targetDate - now;
  
      if (diff <= 0) {
        clearInterval(timerInterval);
        countdownContainer.innerHTML = '<span class="font-heading text-2xl">Свершилось!</span>';
        return;
      }
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * 1000 * 60 * 60;
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * 1000 * 60;
      const seconds = Math.floor(diff / 1000);
  
      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }
  
    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
  
    /* =========================
       Theme toggle
       =========================*/
    const themeBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark-theme');
      themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-theme');
      themeBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  
    /* =========================
       Фоновая музыка
       =========================*/
    const bgAudio = new Audio('song.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.6; // умеренная громкость

    function tryPlay() {
      bgAudio.play().catch(() => {
        /* autoplay может быть заблокирован; запустим после первого клика */
      });
    }

    // Попытаться сразу при загрузке
    tryPlay();
    // Гарантированно запустить при первом взаимодействии
    window.addEventListener('click', function once() {
      tryPlay();
      window.removeEventListener('click', once);
    });
  });