import React from "react";
import DropDownEntry from "./DropDownEntry";
import "../../css/Shared/dropDown.css";

const DropDown = (props) => {
    const makeDropDownObj = (value, index) => {
        if (index === 0){
            return (<div className = "dropDownRow">
                <DropDownEntry index = {props.uniqueDeterminer + "-"+ index}>{{"value":value}}</DropDownEntry>
            </div>)
        }
        else{
            return (
                <div className="dropDownRow">
                    <div className="topLine"></div>
                    <DropDownEntry index = {props.uniqueDeterminer + "-"+ index}>{{"value":value}}</DropDownEntry>
                </div>
            );
        }
    }

    return (
    <div className="dropdown">
        {props.children.map(makeDropDownObj)}
    </div>
    );
}

export default DropDown;