import React, {useState} from 'react';
import Bar from '../Shared/Bar';
import MedalsScroll from './MedalsScroll';
import "../../css/Shared/section.css";
import "../../css/Shared/bar.css";

const MedalsSection = () => {
    const [ifEarned, setIfEarned] = useState("Earned");
    let buttonList = [{"name": "Earned", "defaultOn":true, "create":false},
    {"name": "In Progress", "defaultOn":false, "create":false},];
    return (
    <div data-testid="MedalsSectionComponent" id = "MedalsSection" className='section'>
        <div id = "MedalsHeader" className ="selectButtonHeader">
            <h1>Medals</h1>
            <Bar>{{"buttonList":buttonList, "updateFunc":setIfEarned}}</Bar>
        </div>

        { ifEarned=== "Earned" ? <MedalsScroll>{{"type" : "earned"}}</MedalsScroll> : <></> }
        { ifEarned ==="In Progress" ? <MedalsScroll>{{"type" : "progress"}}</MedalsScroll>:<></>}

    </div>
    );
}

export default MedalsSection;