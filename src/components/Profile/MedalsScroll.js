import React, {useState, useEffect} from 'react';
import MedalObj from './MedalObj';
import { getEarnedMedals, getInProgressMedals } from '../../routes/medals';

const MedalsScroll = (props) => {
    let [type] = useState(props.children.type);
    let [informationMap, setInformationMap] = useState([]);


    function createObj(input, index){
        if(type === "earned"){
            return(<MedalObj key = {index} index = {index}>{input}</MedalObj>);
        }
        else if(type === "progress"){
            return(<MedalObj key = {index} index = {index}>{input}</MedalObj>);
        }
    }

    useEffect(
        () => {
          if (type === "earned") {
            getEarnedMedals(setInformationMap);
          }
          else if(type === "progress"){
            getInProgressMedals(setInformationMap);
          }
        }, [type]
      );
    return (
        <div data-testid="MedalsScrollComponent" id = "MedalsScroll">
            {informationMap.map(createObj)}
        </div>
    );
}

export default MedalsScroll;