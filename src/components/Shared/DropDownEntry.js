import React from "react";
import "../../css/Shared/dropDown.css";
const DropDownEntry = (props) => {
    return (<div className = "dropdownEntry" onClick = {props.children.value.func}><p className = "dropDownText">{props.children.value.name}</p></div>)
};

export default DropDownEntry;