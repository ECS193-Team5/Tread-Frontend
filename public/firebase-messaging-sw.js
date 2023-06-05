
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCIcGRa8RF_55qms1EZnfONr_9RyHqvxzQ",
  authDomain: "tread-379302.firebaseapp.com",
  projectId: "tread-379302",
  storageBucket: "tread-379302.appspot.com",
  messagingSenderId: "171571653869",
  appId: "1:171571653869:web:4e13f823954e00013d30e4"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

function getMessagingIfSupported() {
  try {
    const isSupportedBrowser = firebase.messaging.isSupported();
    if (isSupportedBrowser) {
      return firebase.messaging(app);
    }
    console.log('Firebase not supported this browser');
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
const messaging = getMessagingIfSupported();

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  })
};
