
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

try{
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
const messaging = firebase.messaging(app);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  })};


messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
}
catch(err){}