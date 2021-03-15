
const current = document.querySelector('.gallery__current');
const thumbs = document.querySelectorAll('.gallery__thumb');

for(let i = 0; i < thumbs.length; i++) {
  const thumb = thumbs[i];

  function handleThumbClick () {
    // leemos el source del thumb al que se le dió click
    const thumbSrc = thumb.getAttribute('data-src');
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





const optionsViz = document.querySelector('.options__viz');
const optionsItems = document.querySelectorAll('.options__item');
const originalOptionsVizClass = optionsViz.className;

function handleForEach (elem, i) {

  function handleOptionClick () {
    optionsViz.className = originalOptionsVizClass;
    const className = `options__viz--${elem.getAttribute('data-color')}`;
    optionsViz.classList.add(className);
  }

  elem.addEventListener('click', handleOptionClick);
}

optionsItems.forEach(handleForEach);




const btnOpenModal = document.querySelector('.bnt-open-modal');
const modal = document.querySelector('.modal');

function handleOpenModal () {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

btnOpenModal.addEventListener('click', handleOpenModal);