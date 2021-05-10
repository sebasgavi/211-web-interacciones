const list = document.querySelector('.cartList');
const totalSpan = document.querySelector('.checkout__total span');
const checkoutForm = document.querySelector('.checkout__form');

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

  totalSpan.innerText = total;

  checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const producIds = [];
    cart.forEach(function (data) {
      producIds.push(data.id);
    });

    const order = {
      ccNumber: checkoutForm.ccnumber.value,
      address: checkoutForm.address.value,
      date: Date.now(),
      producIds: producIds,
      total: total,
      uid: loggedUser.uid,
    };

    ORDERS_COLLECTION.add(order)
      .then(function (docRef) {
        console.log(docRef.id);

        CART_COLLECTION.doc(loggedUser.uid).set({
          cart: [],
        });

        location.href = '/store.html';
      });

    console.log(order)
  });
}