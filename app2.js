
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


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

  var signup = document.getElementById('signup')

  signup.addEventListener('click', function(){

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...

      alert('Sign Up Successful')
      location.href= './signin.html'

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert('Error:' + errorMessage)
    });


  })





const handleAuthStateChange = (user) => {
    if (user) {
      
      console.log('User is logged in:', user.email);

      window.location.href = `./polls.html`;

    } else {
    
      console.log('User is logged out');
    }
  };
  

onAuthStateChanged(auth, handleAuthStateChange);