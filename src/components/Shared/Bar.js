import BarButton from "./BarButton";
import { changeBarButton } from "../../Helpers/CssEffects";
import "../../css/Shared/button.css";
import "../../css/Shared/bar.css";
const Bar = (props) => {
    const buttonChange = (value) => {
        props.children.buttonList.map(item => changeBarButton(item, value));
        props.children.updateFunc(value);
    }

    const createBarButton = (input) => {
        return (<BarButton name = {input.name} func = {buttonChange} classes = {input.classes}></BarButton>);
    }

    return(
        <div className="bar">
            {props.children.buttonList.map(createBarButton)}
        </div>
    )
}

export default Bar;