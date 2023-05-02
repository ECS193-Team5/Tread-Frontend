export function redirectLogout(error){
    if(error.response.status===401){
        window.location.href = "/";
    }
}