const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
  list.innerHTML = '';
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
            (${data.type}) ${data.name}
          </h1>
          <h3 class="product__price">$ ${data.price}</h3>
          <p>${new Date(data.createdAt)}</p>
        </div>
      `;
      product.classList.add('product');
      product.setAttribute('href', `./product.html?id=${doc.id}&name=${data.name}`);

      list.appendChild(product);
  });
}

const filters = document.querySelector('.filters');

filters.addEventListener('change', function () {
  let productsCollection = db.collection('products');

  const types = [];
  filters.test.forEach(function (checkbox) {
    if(checkbox.checked) {
      types.push(checkbox.getAttribute('data-type'));
    }
  });
  if(types.length > 0){
    productsCollection = productsCollection.where('type', 'in', types);
  }

  if(filters.type.value) {
    productsCollection = productsCollection.where('type', '==', filters.type.value);
  }

  if(filters.price.value) {
    switch(filters.price.value) {
      case '0':
        productsCollection = productsCollection.where('price', '<', 10000);
        break;
      case '1':
        productsCollection = productsCollection.where('price', '>=', 10000).where('price', '<', 30000);
        break;
      case '2':
        productsCollection = productsCollection.where('price', '>=', 30000);
        break;
    }
  }

  if(filters.order.value) {
    switch(filters.order.value) {
      case 'price_asc':
        productsCollection = productsCollection.orderBy('price', 'asc');
        break;
      case 'price_desc':
        productsCollection = productsCollection.orderBy('price', 'desc');
        break;
      case 'alpha':
        if(filters.price.value) {
          productsCollection = productsCollection.orderBy('price', 'asc');
        }
        productsCollection = productsCollection.orderBy('name', 'asc');
        break;
      case 'createdAt':
        if(filters.price.value) {
          productsCollection = productsCollection.orderBy('price', 'asc');
        }
        productsCollection = productsCollection.orderBy('createdAt', 'desc');
        break;
    }
  }

  productsCollection.get().then(handleCollectionResult);
});

let productsCollection = db.collection('products');

const params = new URLSearchParams(location.search);
if(params.get('type')){
  productsCollection = productsCollection.where('type', '==', params.get('type'));
}

productsCollection.get().then(handleCollectionResult)