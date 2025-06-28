function includeHTML(id, url, callback) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`No se encontró el elemento con id "${id}"`);
    return;
  }

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.text();
    })
    .then((html) => {
      el.innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch((err) => {
      console.error(`No se pudo cargar ${url}:`, err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  includeHTML("header", "/includes/header.html");
  includeHTML("sponsors", "/includes/sponsors.html");
  includeHTML("main-footer", "/includes/footer.html", () => {
    // Cargar script de countdown después del footer
    const script = document.createElement("script");
    script.src = "/js/countdown.js";
    script.defer = true;
    document.body.appendChild(script);
  });

includeHTML("speakers", "/includes/speakers.html", () => {
  // Mezclar speaker-cards
  const track = document.querySelector(".speakers-carousel-track");
  if (track) {
    const cards = Array.from(track.children);
    const shuffled = cards.sort(() => 0.5 - Math.random());
    track.innerHTML = "";
    shuffled.forEach(card => track.appendChild(card));
  }

  // Redirección
  document.addEventListener("click", function (e) {
    const card = e.target.closest(".speaker-card");
    if (card?.dataset?.url) {
      window.location.href = card.dataset.url;
    }
  });

  // Scroll infinito simulado
  const view = document.querySelector(".speakers-carousel-view");
  const scrollAmount = 300;

  document.querySelector(".chevron-left")?.addEventListener("click", () => {
    view.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  document.querySelector(".chevron-right")?.addEventListener("click", () => {
    view.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

  // Lógica del carrusel horizontal
  const track = document.querySelector(".speakers-carousel-track");
  const view = document.querySelector(".speakers-carousel-view");

  if (track && view) {
    const scrollAmount = 300; // puedes ajustar este valor

    document.querySelector(".chevron-left")?.addEventListener("click", () => {
      view.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    document.querySelector(".chevron-right")?.addEventListener("click", () => {
      view.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
});
