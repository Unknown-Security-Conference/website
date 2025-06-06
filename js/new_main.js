document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".speakers-carousel-track");
  const cards = Array.from(track.children);
  const leftBtn = document.querySelector(".chevron-left");
  const rightBtn = document.querySelector(".chevron-right");
  let currentIndex = 0;
  let cardsPerView = 4;

  function updateCardsPerView() {
    if (window.innerWidth < 768) {
      cardsPerView = 1;
    } else if (window.innerWidth < 1200) {
      cardsPerView = 2;
    } else {
      cardsPerView = 4;
    }
  }

  function updateCarousel() {
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

  leftBtn.addEventListener("click", function () {
    currentIndex--;
    updateCarousel();
  });

  rightBtn.addEventListener("click", function () {
    currentIndex++;
    updateCarousel();
  });

  window.addEventListener("resize", function () {
    updateCardsPerView();
    updateCarousel();
  });

  // Inicialización
  updateCardsPerView();
  updateCarousel();
});
