const productForm = document.querySelector('.productForm');
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');
const productFormImages = document.querySelector('.productForm__images');

const tshirtFields = document.querySelector('.tshirtFields');
const stickerFields = document.querySelector('.stickerFields');
const mugFields = document.querySelector('.mugFields');

const imageFiles = [];

productForm.type.addEventListener('change', function() {
  tshirtFields.classList.add('hidden');
  stickerFields.classList.add('hidden');
  mugFields.classList.add('hidden');
  switch(productForm.type.value) {
    case 'sticker':
      stickerFields.classList.remove('hidden');
      break;
    case 't-shirt':
      tshirtFields.classList.remove('hidden');
      break;
    case 'mug':
      mugFields.classList.remove('hidden');
      break;
  }
});

productForm.image.addEventListener('change', function () {
  const file = productForm.image.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const productFormImg = document.createElement('img');
    productFormImg.classList.add('productForm__img');
    productFormImg.setAttribute('src', event.target.result);
    productFormImages.appendChild(productFormImg);
  }
  reader.readAsDataURL(file); // convert to base64 string
  imageFiles.push(file);
});

productForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const product = {
    name: productForm.name.value,
    price: parseFloat(productForm.price.value),
    type: productForm.type.value,
    createdAt: Date.now(),
  };

  switch(product.type) {
    case 'sticker':
      product.sizes = [];
      if(productForm.size_10.checked) product.sizes.push(10);
      if(productForm.size_20.checked) product.sizes.push(20);
      break;
    case 't-shirt':
      product.sizes = [];
      if(productForm.size_s.checked) product.sizes.push('s');
      if(productForm.size_m.checked) product.sizes.push('m');
      if(productForm.size_l.checked) product.sizes.push('l');
      break;
    case 'mug':
      product.color = productForm.color.value;
  }

  let error = '';
  if(!product.name) {
    error += 'The product name is required. <br/>';
  }
  if(!product.price) {
    error += 'The product price is required. <br/>';
  }
  if(product.price < 1000) {
    error += 'The product price can\'t be less than 1000. <br/>';
  }
  if(!product.type) {
    error += 'You must select a product type. <br/>';
  }
  if(error) {
    productFormError.innerHTML = error;
    productFormError.classList.remove('hidden');
    return;
  } else {
    productFormError.classList.add('hidden');
  }

  productFormLoader.classList.remove('hidden');
  productFormError.classList.add('hidden');

  const genericCatch = function (error) {
    productFormLoader.classList.add('hidden');
    productFormError.classList.remove('hidden');
    productFormError.innerHTML = 'There was an error in the product upload.';
  }

  // espera a subir la información al firestore
  db.collection('products').add(product)
  .then(function (docRef) {

    const uploadPromises = [];
    const downloadUrlPromises = [];

    imageFiles.forEach(function (file) {
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);
      // espera a subir la imagen
      uploadPromises.push(fileRef.put(file));
    });

    Promise.all(uploadPromises).then(function (snapshots) {
      snapshots.forEach(function (snapshot) {
        // espera a obtener la url de descarga de la imagen
        downloadUrlPromises.push(snapshot.ref.getDownloadURL());
      });

      Promise.all(downloadUrlPromises).then(function (downloadURLs) {

        const images = [];
        downloadURLs.forEach(function (url, index) {
          images.push({
            url: url,
            ref: snapshots[index].ref.fullPath
          });
        });

        db.collection('products').doc(docRef.id).update({
          images: images
        }).then(function () {
          productFormLoader.classList.add('hidden');
          productFormSuccess.classList.remove('hidden');
        })
        .catch(genericCatch);
      })
      .catch(genericCatch);
    })
    .catch(genericCatch);
  })
  .catch(genericCatch);
});


const checkProductFormAdmin = () => {
  if(!loggedUser || !loggedUser.admin) {
    location.href = '/store.html';
  }
}