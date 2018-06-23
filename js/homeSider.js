let homeLeft = document.querySelector('.home-left');
let homeRight = document.querySelector('.home-right');
let homeWrapper = document.querySelector('.home-wrapper');

homeLeft.addEventListener('mouseenter', () => {
  homeWrapper.classList.add('hover-left');
});

homeLeft.addEventListener('mouseleave', () => {
  homeWrapper.classList.remove('hover-left');
});

homeRight.addEventListener('mouseenter', () => {
  homeWrapper.classList.add('hover-right');
});

homeRight.addEventListener('mouseleave', () => {
  homeWrapper.classList.remove('hover-right');
});