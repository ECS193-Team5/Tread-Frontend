import React from "react";
import '../../css/Shared/button.css';

const BarButton = (props) => {
    const buttonChange = () => {
        props.func(props.name);
    }

    return (<button data-testid={"BarButtonComponent"+props.index} id = {props.name+"BarButton"} onClick = {buttonChange} className = {props.classes}>{props.name}</button>);
}
export default BarButton;