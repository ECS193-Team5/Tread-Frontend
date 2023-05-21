import zeroItemImage from "../../assets/ZeroItem.png";
import "../../css/Shared/zeroItem.css";

const ZeroItem = (props) => {
    return(
        <div className="zeroItemBox">
            <img className = "zeroItemImg" src = {zeroItemImage}></img>
            <p className = "zeroItemText">{props.message}</p>
        </div>
    )
}
export default ZeroItem;