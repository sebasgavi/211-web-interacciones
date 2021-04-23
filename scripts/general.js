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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc) {
      loggedUser = doc.data();
      loggedUser.uid = user.uid;
      userAuthChanged(true);
    });
  } else {
    loggedUser = null;
    userAuthChanged(false);
  }
});