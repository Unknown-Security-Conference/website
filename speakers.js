document.querySelectorAll('.speaker-card').forEach(card => {
card.addEventListener('click', function (e) {
    // Evita que se active si se hizo clic en un <a> dentro del card
    if (!e.target.closest('a')) {
    const url = this.getAttribute('data-url');
    if (url) window.location.href = url;
    }
});
});


