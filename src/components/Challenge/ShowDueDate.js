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
        console.log(input.toISOString(), today.toISOString())
        if (today.getDate() !== input.getDate()){
            return false;
        }
        if(today.getMonth() !== input.getMonth()){
            return false;
        }
        if(today.getFullYear() !== input.getFullYear()){
            return false;
        }
        return true;
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
        setStartDateString("at " +  date.getHours()%12 + ":" + date.getMinutes() + " "+ timeStringSort);
    }

    const getDayStart = (issueDate) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let dayString = ""
        let date = new Date(issueDate);

        dayString += months[date.getMonth()] +" ";
        dayString += date.getDate() +", ";
        dayString += date.getFullYear();
        setStartDateString("on " + dayString)
    }

    return (
        <div data-testid={"ShowDueDateComponent"+props.index}>
            { (issueDate < Date.now()) ?
                <p  style={styleColor}>
                    {timeLeft}
            </p>
            :<p  style={styleColor}>
                {"Starting "+ startDateString}
                </p>
            }
        </div>

    )
};

export default ShowDueDate;