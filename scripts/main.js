
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
