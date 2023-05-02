import redirectLogout from "../Helpers/postRequestHelpers";
import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function addChallenge(inputData, thenFunc, errorFunc){
    var config ={
        method : 'post',
        url : backend_url+"challenges/add_"+inputData.receiverGroup+"_challenge",
        headers: {
        Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data : inputData.data
    };
    axios(config)
    .then(function(response){
        thenFunc();
    })
    .catch(function(error){
        redirectLogout(error);
        errorFunc();
    })
}