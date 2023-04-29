import {useState, useEffect} from "react";

const ExerciseDateForm = (props) => {
    const [issueDate, setIssueDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [dueDateError, setDueDateError] = useState("");


    useEffect (
        () => {
            if(props.defaultIssueDate){
                document.getElementById("issueDateInput").value = new Date(props.defaultIssueDate).toISOString().substring(0,10);
                setDueDateError("");
            }
        }, [props.defaultIssueDate]
    );

    useEffect (
        () => {
            if(props.defaultDueDate){
                document.getElementById("dueDateInput").value = new Date(props.defaultDueDate).toISOString().substring(0,10);
                setDueDateError("");
            }
        }, [props.defaultDueDate]
    );

    const issueDateChange = (event) => {
        setIssueDate(event.target.value);
        dateCheck(event.target.value, dueDate);
    }

    const dueDateChange = (event) => {
        setDueDate(event.target.value);
        dateCheck(issueDate, event.target.value);
    }

    const dateCheck = (targetIssueDate, targetDueDate) => {
        if(targetIssueDate === "" && targetDueDate === ""){
            setDueDateError("");
            props.updateDueDate("");
            props.updateIssueDate("");
        }
        else if (targetIssueDate === ""){
            setDueDateError("The due date needs to be after the start date.");
            props.updateDueDate("");
            props.updateIssueDate("");
        }
        else if(targetDueDate === ""){
            setDueDateError("");
            props.updateDueDate("");
            props.updateIssueDate("");
        }
        else if(new Date(targetIssueDate) >= new Date(targetDueDate)){
            setDueDateError("The due date needs to be after the start date.");
            props.updateDueDate("");
            props.updateIssueDate("");
        }
        else if(new Date(targetIssueDate) < new Date(targetDueDate)){
            props.updateDueDate(new Date(targetDueDate));
            props.updateIssueDate(new Date(targetIssueDate));
            setDueDateError("");
        }
    }

    function getToday(){
        let date_ob = new Date()

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        return (year + "-" + month + "-" + date);
    }

    function getTomorrow(){
        var date_ob = new Date()
        date_ob.setDate(date_ob.getDate() + 1);

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        return (year + "-" + month + "-" + date);
      }

    return (
        <div>
            <div className="formObj">
                <p className="formObjInner">Issue Date</p>
                <input id="issueDateInput" onKeyDown="return false" className="formDateInput" type="date" min={getToday()} onChange={issueDateChange}></input>
            </div>

            <div className="formObj">
                <p className="formObjInner">Due Date</p>
                <input id="dueDateInput"  onKeyDown="return false" className="formDateInput" type="date" min={getTomorrow()} onChange={dueDateChange}></input>
                <p className="errorBox">{dueDateError}</p>
            </div>
        </div>);
}

export default ExerciseDateForm;