import React, {useEffect, useState} from "react";

const MIN_IN_YEAR = 60*24*365;
const MIN_IN_DAY = 60*24;
const MIN_IN_HOUR = 60;

const ShowDueDate = (props) => {
    let dueDate = Date.parse(props.dueDate);

    const [timeLeft, setTimeLeft] = useState("");
    const [styleColor, setStyleColor] = useState({color:"green"});
    const convertTimeLeft = (minLeft) => {

        if (minLeft/MIN_IN_YEAR > 1){
            setTimeLeft(Math.floor(minLeft/MIN_IN_YEAR) + "Y");
            setStyleColor({color:"green"});
            return;
        }

        if (minLeft/MIN_IN_DAY > 1){
            setTimeLeft(Math.floor(minLeft/MIN_IN_DAY) + "d");
            setStyleColor({color:"green"});
            return;
        }

        if (minLeft/MIN_IN_HOUR > 1){
            setTimeLeft(Math.floor(minLeft/MIN_IN_HOUR) + "h");
            setStyleColor({color:"red"});
            return;
        }

        setTimeLeft(Math.floor(minLeft) + "m");
        setStyleColor({color:"red"});
    }


    useEffect(() => {
        let minLeft = Math.round((dueDate/1000 - Date.now()/1000)/60);
        convertTimeLeft(minLeft);

        const interval = setInterval(() => {
            let minLeft = Math.round((dueDate/1000 - Date.now()/1000)/60);
            convertTimeLeft(minLeft);
        }, 1000*60);

        return () => clearInterval(interval);
      }, []);

    return (<p data-testid={"ShowDueDateComponent"+props.index} style={styleColor}>
        {timeLeft}
    </p>)
};

export default ShowDueDate;