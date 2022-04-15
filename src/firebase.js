import firebase from 'firebase/app';
import 'firebase/firestore';
//import 'firebase/auth';
//import 'firebase/storage';

//var firebase = require("firebase");
// Initialize Firebase
/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA-dgPz2St....",
    authDomain: "practical-coding.firebaseapp.com",
    projectId: "practical-coding",
    storageBucket: "practical-coding.appspot.com",
    messagingSenderId: "1107250.....",
    appId: "1:110725080091:web:d6541c24969......",
    measurementId: "G-Z6V6K...."
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
*/


// firebase 에서 WebApp을 추가하면 위와 같은 샘플을 준다. 
// 그 데이터를 아래와 같이 변환한다.
 
const firebaseConfig = {
  apiKey: "AIzaSyBNHWR2lSlN7sIiBsrLv5wRvuywV9OCT0k",
  authDomain: "fir-practice-48103.firebaseapp.com",
  databaseURL: "https://fir-practice-48103-default-rtdb.firebaseio.com",
  projectId: "fir-practice-48103",
  storageBucket: "fir-practice-48103.appspot.com",
  messagingSenderId: "315335695287",
  appId: "1:315335695287:web:8b2e389d96206e577ae632",
  measurementId: "G-WNK113796N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
