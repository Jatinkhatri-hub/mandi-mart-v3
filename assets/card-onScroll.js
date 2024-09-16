document.addEventListener('DOMContentLoaded', () => {
  const allCards = document.querySelectorAll('.custom-card');

  const revealCard = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);

    // if (!entry.isIntersecting) return;

    entry.target.classList.remove('card-hidden');
    observer.unobserve(entry.target);
  };

  const cardObserver = new IntersectionObserver
  (revealCard, {
    root: null,
    threshold: 0.5,
  });

  allCards.forEach(function (card) {
    cardObserver.observe(card);
    card.classList.add('card-hidden');
  });

});