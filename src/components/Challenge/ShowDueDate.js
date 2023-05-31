import React, {useEffect, useState} from "react";
const MIN_IN_YEAR = 60*24*365;
const MIN_IN_DAY = 60*24;
const MIN_IN_HOUR = 60;

const ShowDueDate = (props) => {
    let dueDate = Date.parse(props.dueDate);
    let issueDate = Date.parse(props.issueDate);
    const [timeLeft, setTimeLeft] = useState("");
    const [styleColor, setStyleColor] = useState({color:"green"});
    const [startDateString, setStartDateString] = useState("");

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

    const isToday = (date) => {
        let input = new Date(date);
        let today = new Date();

        return (today.getDate() === input.getDate() && today.getMonth() === input.getMonth() && today.getFullYear() === input.getFullYear());
    }

    useEffect(() => {
        if(issueDate < Date.now()){
            let minLeft = Math.round((dueDate/1000 - Date.now()/1000)/60);
            convertTimeLeft(minLeft);

            const interval = setInterval(() => {
                let minLeft = Math.round((dueDate/1000 - Date.now()/1000)/60);
                convertTimeLeft(minLeft);
            }, 1000*60);

            return () => clearInterval(interval);
        }
        else{
            if(isToday(issueDate)){
                getHourStart(issueDate);
            }
            else{
                getDayStart(issueDate);
            }
        }
      }, []);


    const getHourStart = (issueDate) => {
        let date = new Date(issueDate);
        let timeStringSort = (date.getHours() >= 12) ? "PM" : "AM";
        let minutes = String(date.getMinutes());

        if (minutes.length == 1){
            minutes = "0"+minutes;
        }

        setStartDateString("Starting at " +  date.getHours()%12 + ":" + minutes + " "+ timeStringSort);
    }

    const getDayStart = (issueDate) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let dayString = ""
        let date = new Date(issueDate);

        dayString += months[date.getMonth()] +" ";
        dayString += date.getDate() +", ";
        dayString += date.getFullYear();
        setStartDateString("Starting on " + dayString)
    }

    return (
        <div data-testid={"ShowDueDateComponent"+props.index}>
            { (issueDate < Date.now()) ?
                <p data-testid={"ShowDueDateComponent"+props.index+"timeLeft"} style={styleColor}>
                    {timeLeft}
                </p>
                :
                <p  style={styleColor} data-testid={"ShowDueDateComponent"+props.index+"startDateString"}>
                    {startDateString}
                </p>
            }
        </div>

    )
};

export default ShowDueDate;