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

const productForm = document.querySelector('.productForm');
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');

productForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const product = {
    name: productForm.name.value,
    price: parseFloat(productForm.price.value),
    sizes: [],
  };
  if(productForm.size_s.checked) product.sizes.push('s');
  if(productForm.size_m.checked) product.sizes.push('m');
  if(productForm.size_l.checked) product.sizes.push('l');

  console.log(product);

  productFormLoader.classList.remove('hidden');
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
});