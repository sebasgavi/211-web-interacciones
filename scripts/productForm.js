const firebaseConfig = {
  apiKey: "AIzaSyCeSTAo58akYTQpoK-kt-YE1D82FttPhmE",
  authDomain: "web-store-1f07d.firebaseapp.com",
  projectId: "web-store-1f07d",
  storageBucket: "web-store-1f07d.appspot.com",
  messagingSenderId: "3244811347",
  appId: "1:3244811347:web:71c6289b1da94aa35e92a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const productForm = document.querySelector('.productForm');
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');
const productFormImg = document.querySelector('.productForm__img');

const tshirtFields = document.querySelector('.tshirtFields');
const stickerFields = document.querySelector('.stickerFields');
const mugFields = document.querySelector('.mugFields');

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
  var reader = new FileReader();
  reader.onload = function(event) {
    productFormImg.classList.remove('hidden');
    productFormImg.setAttribute('src', event.target.result);
  }
  reader.readAsDataURL(productForm.image.files[0]); // convert to base64 string
});

productForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const product = {
    name: productForm.name.value,
    price: parseFloat(productForm.price.value),
    type: productForm.type.value,
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
    // return;
  } else {
    productFormError.classList.add('hidden');
  }

  const file = productForm.image.files[0];

  var storageRef = firebase.storage().ref();
  var fileRef = storageRef.child(`images/${product.type}/${file.name}`);

  // espera a subir la imagen
  fileRef.put(file).then(function (snapshot) {

    // espera a obtener la url de descarga de la imagen
    snapshot.ref.getDownloadURL().then((downloadURL) => {
      productFormLoader.classList.remove('hidden');
      product.imageUrl = downloadURL;
      product.imageRef = snapshot.ref.fullPath;

      // espera a subir la información al firestore
      db.collection('products').add(product)
      .then(function (docRef) {
        console.log('document added', docRef.id)
        productFormLoader.classList.add('hidden');
        productFormSuccess.classList.remove('hidden');
      })
      .catch(function (error) {
        productFormLoader.classList.add('hidden');
        productFormError.classList.remove('hidden');
      });
      console.log('File available at', downloadURL);
    });

    console.log(snapshot)
    console.log('Uploaded a blob or file!');
  });
});