import React from "react";
import zeroItemImage from "../../assets/ZeroItem.png";
import "../../css/Shared/zeroItem.css";

const ZeroItem = (props) => {
    return(
        <div data-testid="ZeroItemComponent" className="zeroItemBox">
            <img className = "zeroItemImg" src = {zeroItemImage}></img>
            <p data-testid="ZeroItemMessage" className = "zeroItemText">{props.message}</p>
        </div>
    )
}
export default ZeroItem;