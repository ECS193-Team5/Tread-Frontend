import React, {useState, useEffect} from "react";
import AppleSignin from 'react-apple-signin-auth';
import { v4 as uuid } from 'uuid';
import { getToken } from 'firebase/messaging';
import { exportMessaging, requestPermission } from "../../firebase";
import axios from 'axios';
import "../../css/Login/login.css";
const backend_url = process.env.REACT_APP_PROD_BACKEND;



/**
 *
 * /*
{authorization: {…}, user: {…}}
authorization
:
code
:
"c34d5c1154f054a66a46900a55a5bdd6a.0.rrqr.1Up3VoQT06_jzS4ZoiBgDg"
id_token
:
"eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoicnVuLnRyZWFkLmFwcGxlc2lnbmluIiwiZXhwIjoxNjg1MDY3NDk2LCJpYXQiOjE2ODQ5ODEwOTYsInN1YiI6IjAwMDEwMS5iNmIwYzNlYjgzZWY0YjVhOTFlNTg4OWQ2YmY3NjhkZi4wMjE4Iiwibm9uY2UiOiJub25jZSIsImNfaGFzaCI6Ik9mM1JmWjZRM0xGS28zVmtDbFhrWmciLCJlbWFpbCI6InJlYmVrYWhncmFjZWZ1bHByb2R1Y3Rpb25zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTY4NDk4MTA5Niwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.vvVqR5rytbS503CT0vb72CnfwRezzJ5RvcMWiCNTUULYpO7wqL5OFgOywYqNmkxLEWYTZm0hcD55BrfdfNJmIpWW7GHXCS7V-qKUCus8a5wqfj5jFE2DEza9Nymzrcotehuw7APcZPn2fcrXxwaAKpJY69Zvuya1Sf1wQGL9cLNdREc6B4-PvTw-VjdHoDIxe2JvqsUa2Ue5IEWx2AYuX-9jKC-1kU1qn_pg2KAX7NKgoq3siXkF8KOEpSElAmExFzlBMlvViXH4TcXFDpPPWWgO7fiFuiIJ11laiqKZa0FuoE0jKNg-AHl2i_NQf_eFU3AT_1FRt-XqK2PClbe7yw"
state
:
"state"
[[Prototype]]
:
Object
user
:
email
:
"rebekahgracefulproductions@gmail.com"
name
:
{firstName: 'Rebekah', lastName: 'Grace'}
[[Prototype]]
:
Object
[[Prototype]]
:
Object
:
Object*/

/** Apple Signin button */
const AppleSigninButton = () => {
  const [deviceToken, setToken] = useState("");
  const [load, setLoad] = useState(false);
  const [rawNonce, setNonce] = useState("");
  useEffect(() => {
    if(!load){
      setDeviceToken();
      setLoad(true);
      let val = uuid();
      setNonce(val.toString());
    }
  }, [load]);

  const setDeviceToken = () => {
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

  const loginApple = (response) => {
    let fullname = {};
    if (response.user){
      fullname = {
        givenName: response.user.firstName,
        familyName: response.user.lastName
      }
    }

    var config = {
      method: 'post',
      url: backend_url + 'auth/login/apple',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: response.authorization.id_token,
        Accept: 'application/json',
      },
      data:
      {
        deviceToken: deviceToken,
        fullname: fullname ,
        nonce: rawNonce
      }
    };
    let hasUsername = false;
    axios(config)
      .then(function (response) {
        hasUsername = response.data.hasUsername;
        if (!hasUsername) {
          window.location.href = "./signUpPage";
        }
        else {
          window.location.href = "./currentChallengePage";
        }
      })
      .catch(function (error) {
      });
  }

  const setErrorResponse = (error) => {
    console.log(error);
  }

  return(<div data-testid="AppleSignInButtonComponent" id = "AppleSignInButton"><AppleSignin
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
      nonce: rawNonce,
      /** Uses popup auth instead of redirection */
      usePopup: true}} // REQUIRED
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
    onSuccess={(response) => {loginApple(response)}} // default = undefined
    /** Called upon signin error */
    onError={(error) => {setErrorResponse(error)}} // default = undefined
    /** Skips loading the apple script if true */
    skipScript={false} // default = undefined
    /** Apple image props */
    iconProp={{ style: { marginTop: '10px' } }} // default = undefined
    /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
    /*render={(props) => <button {...props}>My Custom Button</button>}*/

  /></div>);
  };

export default AppleSigninButton;