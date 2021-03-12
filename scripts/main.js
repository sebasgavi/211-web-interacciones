
const current = document.querySelector('.gallery__current');
const thumbs = document.querySelectorAll('.gallery__thumb');

for(let i = 0; i < thumbs.length; i++) {
  const thumb = thumbs[i];

  function handleThumbClick () {
    // leemos el source del thumb al que se le dió click
    const thumbSrc = thumb.getAttribute('src');
    // asignamos el source a la imagen grande, de la que se le dió click
    current.setAttribute('src', thumbSrc);
  }

  thumb.addEventListener('click', handleThumbClick);

  // cuando sea la primera iteración llamamos la función que cambia el source
  if(i === 0) handleThumbClick();
}




const slider = document.querySelector('.carrousel__slider');
let currentSlide = 0;

function handleInterval () {
  currentSlide++;
  if(currentSlide >= slider.children.length){
    currentSlide = 0;
  }
  slider.style.transform = `translate(-${ slider.clientWidth * currentSlide }px, 0px)`;
}

let intervalId;

function handleMouseEnter () {
  intervalId = setInterval(handleInterval, 1000);
}

slider.addEventListener('mouseenter', handleMouseEnter);


function handleMouseLeave () {
  clearInterval(intervalId);
}

slider.addEventListener('mouseleave', handleMouseLeave);
