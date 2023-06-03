import React, { useState, useEffect } from "react";
import AppleSignin from 'react-apple-signin-auth';
import { Sha256 } from '@aws-crypto/sha256-browser';
import { v4 as uuid } from 'uuid';
import { getToken } from 'firebase/messaging';
import { exportMessaging, requestPermission } from "../../firebase";
import { loginAppleSignIn } from "../../routes/auth";
import "../../css/Login/login.css";

/** Apple Signin button */
const AppleSigninButton = () => {
  const [deviceToken, setToken] = useState("");
  const [load, setLoad] = useState(false);
  const [rawNonce, setRawNonce] = useState("");
  const [hashedNonce, setHashedNonce] = useState("");

  useEffect(() => {
    if (!load) {
      setDeviceToken();
      setLoad(true);
      createHashedNonce();
    }
  }, [load]);


  const convertHex = (num) => {
    let string = num.toString(16);

    if(string.length === 1){
      string = "0"+string
    }
    return string
  }

  const convertHexNonce = (string) => {
    let stringEx = ""
    string.forEach(
      (item)=>{stringEx += convertHex(item)}
    );
    return stringEx;
  }

  async function createHashedNonce() {
    let uuidVal = uuid().toString();
    setRawNonce(uuidVal);
    let hash = new Sha256();
    hash.update(uuidVal);
    let result = await hash.digest()
    let hashedNonce = convertHexNonce(result);
    setHashedNonce(hashedNonce);
  }

  const setDeviceToken = () => {
    try{
    getToken(exportMessaging, { vapidKey: "BDXZrQCKEnAfnJWh6oIbEYKTuogSmiNl4gKVIDNmOEabzRt2BpAVIV4Znb7OgKzWJAz9eLOKde6YhWLpAdw1EZ0" }).then((currentToken) => {
      if (currentToken) {
        console.log("Setting token here", currentToken);
        setToken(currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        requestPermission();
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    }
    catch(err){
      console.log("Get token caused problems");
    }
  }

  const loginApple = (response) => {
    loginAppleSignIn(response, deviceToken, rawNonce);
  }

  const setErrorResponse = (error) => {
    console.log(error);
  }

  return (<div data-testid="AppleSignInButtonComponent" id="AppleSignInButton">

    {(hashedNonce !== "") ?
      <AppleSignin
        authOptions={{
          /** Client ID - eg: 'com.example.com' */
          clientId: 'run.tread.applesignin',
          /** Requested scopes, seperated by spaces - eg: 'email name' */
          scope: 'email name',
          /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
          redirectURI: 'https://tread.run',
          /** State string that is returned with the apple response */
          state: 'state',
          /** Nonce */
          nonce: hashedNonce,
          /** Uses popup auth instead of redirection */
          usePopup: true
        }} // REQUIRED
        /** General props */
        uiType="dark"
        /** className */
        className="apple-auth-btn"
        /** Removes default style tag */
        noDefaultStyle={false}
        /** Allows to change the button's children, eg: for changing the button text */
        buttonExtraChildren="Continue with Apple"
        /** Extra controlling props */
        /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
        onSuccess={(response) => { loginApple(response) }} // default = undefined
        /** Called upon signin error */
        onError={(error) => { setErrorResponse(error) }} // default = undefined
        /** Skips loading the apple script if true */
        skipScript={false} // default = undefined
        /** Apple image props */
        iconProp={{ style: { marginTop: '10px' } }} // default = undefined
      /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
      /*render={(props) => <button {...props}>My Custom Button</button>}*/

      />
      : <></>}
  </div>
  )
};

export default AppleSigninButton;