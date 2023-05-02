export default function checkLogin(error){
    if(error.response.status===401){
        window.location.href = "/loginPage";
    }
}