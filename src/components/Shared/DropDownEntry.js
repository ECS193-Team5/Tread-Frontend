import React from "react";
import "../../css/Shared/dropDown.css";
const DropDownEntry = (props) => {
    return (<div data-testid={"DropDownEntryComponent"+props.index} className = "dropdownEntry" onClick = {props.children.value.func}><p data-testid={"DropDownEntryDropDownText"+props.index} className = "dropDownText">{props.children.value.name}</p></div>)
};

export default DropDownEntry;