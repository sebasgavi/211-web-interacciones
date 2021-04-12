const list = document.querySelector('.list');

db.collection('products')
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('a');
        let img = data.images[0]?.url;
        if(!img) {
          img = './images/placeholder-image.png';
        }
        product.innerHTML = `
          <img class="product__img" src="${img}" alt="">
          <div class="product__info">
            <h1 class="product__title">
              ${data.name}
            </h1>
            <h3 class="product__price">$ ${data.price}</h3>
          </div>
        `;
        product.classList.add('product');
        product.setAttribute('href', '#');

        list.appendChild(product);
    });
})