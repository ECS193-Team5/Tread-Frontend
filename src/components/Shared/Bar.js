import React from "react";
import BarButton from "./BarButton";
import { changeBarButton } from "../../helpers/CssEffects";
import "../../css/Shared/button.css";
import "../../css/Shared/bar.css";
const Bar = (props) => {
    const buttonChange = (value) => {
        props.children.buttonList.map(item => changeBarButton(item, value));
        props.children.updateFunc(value);
    }

    const createClassList = (input) => {
        let classList = "BarButton";

        if (input.defaultOn){
            classList += " OnButton";
        }
        else{
            classList += " OffButton";
        }

        if(input.create){
            classList += "Create"
        }
        else{
            classList += "NoCreate";
        }
        return classList;
    }

    const createBarButton = (input, index) => {
        return (<BarButton key= {index} index = {index} name = {input.name} func = {buttonChange} classes = {createClassList(input)}></BarButton>);
    }

    return(
        <div data-testid="BarComponent" className="bar">
            {props.children.buttonList.map(createBarButton)}
        </div>
    )
}

export default Bar;