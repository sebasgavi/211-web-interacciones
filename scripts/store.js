

const products = [
  {
    img: 'https://m.media-amazon.com/images/I/81qyWRQSvFL._AC_UL320_.jpg',
    title: 'lorem ipsum',
    price: 60000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/71XaLtC-IrL._AC_UL320_.jpg',
    title: 'dolor sit amet',
    price: 50000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/71Jpls24-2L._AC_UL320_.jpg',
    title: 'algo en latín',
    price: 10000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/81qyWRQSvFL._AC_UL320_.jpg',
    title: 'lorem ipsum',
    price: 60000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/71XaLtC-IrL._AC_UL320_.jpg',
    title: 'dolor sit amet',
    price: 50000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/71Jpls24-2L._AC_UL320_.jpg',
    title: 'algo en latín',
    price: 10000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/81qyWRQSvFL._AC_UL320_.jpg',
    title: 'lorem ipsum',
    price: 60000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/71XaLtC-IrL._AC_UL320_.jpg',
    title: 'dolor sit amet',
    price: 50000,
  },
  {
    img: 'https://m.media-amazon.com/images/I/71Jpls24-2L._AC_UL320_.jpg',
    title: 'algo en latín',
    price: 10000,
  },
];

const list = document.querySelector('.list');

function handleProductItem (item) {
  const product = document.createElement('a');
  product.innerHTML = `
    <img class="product__img" src="${item.img}" alt="">
    <div class="product__info">
      <h1 class="product__title">
        ${item.title}
      </h1>
      <h3 class="product__price">$ ${item.price}</h3>
    </div>
  `;
  product.classList.add('product');
  product.setAttribute('href', '#');

  list.appendChild(product);
}

products.forEach(handleProductItem)