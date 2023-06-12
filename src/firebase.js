import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, isSupported } from "firebase/messaging";
import { reloadPage } from "./helpers/CssEffects";


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

async function getMessagingIfSupported() {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log('Firebase not supported this browser');
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
const messaging = await getMessagingIfSupported();

if (messaging) {
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    window.alert(payload.notification.body)
    const userLocation = new URL(window.location.href);
    console.log("onmessage", userLocation.pathname, ('/' + payload.data.page));
    if (userLocation.pathname === '/' + payload.data.page){
      reloadPage();
    }
  });
}

export function onForegroundMessage() {
  return new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)))
};

export const exportMessaging = messaging;
