import axios from 'axios';
import { redirectLogout } from '../helpers/CssEffects';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function getUsername(thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'user/get_username',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
  };
  axios(config)
    .then(function (response) {
      thenFunc(response.data);
    })
    .catch(function (error) {

    });
}

export function updateUserPicture(photo, setPhotoResponse) {
  var formData = new FormData();
  formData.append("picture", photo);

  var config = {
    method: 'post',
    url: backend_url + 'user/update_picture',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: formData
  };
  axios(config)
    .then(function (response) {
      setPhotoResponse("You have succesfully uploaded your photo. Please give around 5 minutes to see changes.");
    })
    .catch(function (error) {
      redirectLogout(error);
      setPhotoResponse("Could not update photo at this time. Please try again later.");
    });
}

export function updateDisplayName(displayName, setDisplayErrorResponse) {
  var config = {
    method: 'post',
    url: backend_url + 'user/update_display_name',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data:
    {
      displayName: displayName
    }
  };
  axios(config)
    .then(function (response) {
      setDisplayErrorResponse("Successfully submitted display name")
    })
    .catch(function (error) {
      setDisplayErrorResponse("Could not submit display name. Please try again later.")
      redirectLogout(error)
    });
}