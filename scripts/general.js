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

let loggedUser = null;

const setLoggedUser = (info, id) => {
  loggedUser = info;
  loggedUser.uid = id;
  userAuthChanged(true);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc) {
      if(!doc.data()) return;
      setLoggedUser(doc.data(), user.uid);
    });
    getMyCart(user.uid);
  } else {
    loggedUser = null;
    cart = [];
    userAuthChanged(false);
  }
});

let cart = [];
const cartBtnNumber = document.querySelector('.cartBtn span');
const CART_COLLECTION = db.collection('cart');

const addToMyCart = (product) => {
  cart.push(product);
  CART_COLLECTION.doc(loggedUser.uid).set({
    cart,
  });
  cartBtnNumber.innerText = cart.length;
};

let renderCart = null;

const getMyCart = (uid) => {
  CART_COLLECTION.doc(uid).get().then(snapShot => {
    const data = snapShot.data();
    if(!data) return;
    if(cartBtnNumber) cartBtnNumber.innerText = data.cart.length;
    cart = data.cart;
    if(renderCart) renderCart();
  });
}

/* 
const cartFromLS = localStorage.getItem('store__cart');
if(cartFromLS) {
  cart = JSON.parse(cartFromLS);
  if(cartBtnNumber) {
    cartBtnNumber.innerText = cart.length;
  }
} */