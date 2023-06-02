import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from "firebase/messaging";

export function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
};

const firebaseConfig = {

    apiKey: "AIzaSyCIcGRa8RF_55qms1EZnfONr_9RyHqvxzQ",
    authDomain: "tread-379302.firebaseapp.com",
    projectId: "tread-379302",
    storageBucket: "tread-379302.appspot.com",
    messagingSenderId: "171571653869",
    appId: "1:171571653869:web:4e13f823954e00013d30e4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));

export const exportMessaging = messaging;
