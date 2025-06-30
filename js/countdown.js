const targetDate = new Date("2025-07-10T00:00:00").getTime();

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function animateUpdate(el, newVal) {
  if (el && el.textContent !== newVal) {
    el.classList.remove("fadeInDown");
    void el.offsetWidth;
    el.textContent = newVal;
    el.classList.add("fadeInDown");
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) return;

  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
    2,
    "0"
  );
  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

  animateUpdate(countdownElements.days, days);
  animateUpdate(countdownElements.hours, hours);
  animateUpdate(countdownElements.minutes, minutes);
  animateUpdate(countdownElements.seconds, seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();
