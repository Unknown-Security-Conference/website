document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".speakers-carousel-track2");
  const cards = Array.from(track.children);

  const leftBtn = document.querySelector(".chevron-left2");
  const rightBtn = document.querySelector(".chevron-right2");

  let currentIndex = 0;
  let cardsPerView = 4;

  // Para mobile: índice de la card activa
  let mobileCurrent = 0;

  function updateCardsPerView() {
    if (window.innerWidth <= 575) {
      cardsPerView = 1;
    } else if (window.innerWidth < 768) {
      cardsPerView = 1;
    } else if (window.innerWidth < 1200) {
      cardsPerView = 2;
    } else {
      cardsPerView = 4;
    }
  }

  function updateCarousel() {
    // Mobile: solo mostrar una card con .active
    if (window.innerWidth <= 575) {
      cards.forEach((card, idx) => {
        if (idx === mobileCurrent) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });
      // No translateX en mobile, las cards están ocultas salvo la activa
      leftBtn.disabled = cards.length <= 1;
      rightBtn.disabled = cards.length <= 1;
    } else {
      // Desktop/tablet: slider tradicional
      cards.forEach((card) => card.classList.remove("active"));
      const cardWidth =
        cards[0].offsetWidth +
        parseInt(getComputedStyle(cards[0]).marginLeft) +
        parseInt(getComputedStyle(cards[0]).marginRight);
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      leftBtn.disabled = currentIndex === 0;
      rightBtn.disabled = currentIndex === maxIndex;
    }
  }

  leftBtn.addEventListener("click", function () {
    if (window.innerWidth <= 575) {
      // Mobile: solo cambia la card activa
      mobileCurrent = (mobileCurrent - 1 + cards.length) % cards.length;
      updateCarousel();
    } else {
      currentIndex--;
      updateCarousel();
    }
  });

  rightBtn.addEventListener("click", function () {
    if (window.innerWidth <= 575) {
      // Mobile: solo cambia la card activa
      mobileCurrent = (mobileCurrent + 1) % cards.length;
      updateCarousel();
    } else {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", function () {
    updateCardsPerView();
    // Al cambiar de tamaño, sincroniza el índice de mobile y desktop
    if (window.innerWidth <= 575) {
      // Si venimos de desktop, muestra la primera card
      mobileCurrent = currentIndex;
    } else {
      // Si venimos de mobile, sincroniza el índice
      currentIndex = mobileCurrent;
    }
    updateCarousel();
  });

  // Inicialización
  updateCardsPerView();
  updateCarousel();
});
