
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCPc1VMHLkbEFooYuCdxhYr_WfXYhLqDoE",
    authDomain: "pollingapp-faizan.firebaseapp.com",
    projectId: "pollingapp-faizan",
    storageBucket: "pollingapp-faizan.appspot.com",
    messagingSenderId: "444298568482",
    appId: "1:444298568482:web:54b74f8c4cbce934c03b7b",
    measurementId: "G-KKWK8QQFMD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  var signin = document.getElementById('signin')

  signin.addEventListener('click', function(){

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem('email', email);
    var successlogin = true;
    // ...
    alert('Sign in Successful')
    location.href = './polls.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert('Error: Please Sign up')
    location.href = './index.html'

  });


  })

  if(successlogin = true){

  function toImp(){
    var toImport = email;
      return toImport;
  }
  };





const handleAuthStateChange = (user) => {
    if (user) {
      
      console.log('User is logged in:', user.email);
    } else {
    
      console.log('User is logged out');
    }
  };
  

  firebase.auth().onAuthStateChanged(handleAuthStateChange);
