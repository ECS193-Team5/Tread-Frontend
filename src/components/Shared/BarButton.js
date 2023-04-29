import '../../css/Shared/button.css';

const BarButton = (props) => {
    const buttonChange = () => {
        props.func(props.name);
    }

    return (<button id = {props.name+"BarButton"} onClick = {buttonChange} className = {props.classes}>{props.name}</button>);
}
export default BarButton;