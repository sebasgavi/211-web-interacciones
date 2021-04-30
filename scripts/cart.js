const list = document.querySelector('.cartList');

let total = 0;

renderCart = () => {
  cart.forEach((data) => {
    const product = document.createElement('div');
    let img = data.images[0]?.url;
    if(!img) {
      img = './images/placeholder-image.png';
    }
    product.classList.add('product');
    product.innerHTML = `
      <img class="product__img" src="${img}" alt="">
      <div class="product__info">
        <h1 class="product__title">
          (${data.type}) ${data.name}
        </h1>
        <h3 class="product__price">$ ${data.price}</h3>
        <p>${new Date(data.createdAt)}</p>
      </div>
    `;
    list.appendChild(product);
    total += data.price;
  });
}