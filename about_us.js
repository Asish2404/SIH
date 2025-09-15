// Animate boxes on scroll
const boxes = document.querySelectorAll('.slide-in');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;

  boxes.forEach((box, index) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.style.transitionDelay = `${index * 0.2}s`; // staggered entry
      box.classList.add('show');
    } else {
      box.classList.remove('show');
      box.style.transitionDelay = '0s';
    }
  });
});
