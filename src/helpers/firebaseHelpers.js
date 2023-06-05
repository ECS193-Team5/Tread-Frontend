import { getToken } from 'firebase/messaging';
import { exportMessaging, requestPermission } from "../firebase";

export function setDeviceToken (setToken, setLoadedToken) {
  if (!exportMessaging) {
    if(setLoadedToken){
      setLoadedToken(true);
    }
    return;
  };

  getToken(exportMessaging, { vapidKey: "BDXZrQCKEnAfnJWh6oIbEYKTuogSmiNl4gKVIDNmOEabzRt2BpAVIV4Znb7OgKzWJAz9eLOKde6YhWLpAdw1EZ0" }).then((currentToken) => {
    if (currentToken) {
      console.log("Setting token here", currentToken);
      setToken(currentToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      requestPermission();
      if(setLoadedToken){
        setLoadedToken(true);
      }
    }
  }).catch((err) => {
    if(setLoadedToken){
      setLoadedToken(true);
    }
    console.log('An error occurred while retrieving token. ', err);
  });
}