export const setDisplayProperty = (id, type) => {
    document.getElementById(id).style.display = type;
}

export const reloadPage = () => {
    window.location.href = window.location.href;
}

export const setLocation = (location) =>{
    window.location.href = location;
}

export const getLocation = () =>{
    return window.location.pathname;
}

export const getHrefLocation = () =>{
    return window.location.href;
}

export const flipButton = (id, showState) => {
    let deg = 180;
    if (showState){
        deg = 0;
    }
    document.getElementById(id).style.transform = 'rotate(' + deg + 'deg)';
}

export const changeBarButton = (button, onButton) => {
    let on = (button.name === onButton);
    let classList = "BarButton";

    if (on){
        classList += " OnButton";
    }
    else{
        classList += " OffButton";
    }

    if(button.create){
        classList += "Create"
    }
    else{
        classList += "NoCreate";
    }

    document.getElementById(button.name + "BarButton").className = classList;

}

export function redirectLogout(error){
    try{
    if(error.response.status===401){
        window.location.href = "/";
    }
    }
    catch(error){
        console.log(error);
    }
}