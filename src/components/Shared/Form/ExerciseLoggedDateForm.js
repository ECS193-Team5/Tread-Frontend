

const ExerciseLoggedDateForm = (props) => {
    const loggedDateChange = (event) => {
        props.updateLoggedDate(new Date(event.target.value));
    }

    function getToday(){
        let date_ob = new Date()

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hour = ("0" + (date_ob.getHours() + 1)).slice(-2);
        let sec = ("0" + (date_ob.getSeconds() + 1)).slice(-2);

        return (year + "-" + month + "-" + date +"T"+hour+":"+sec);
    }

    const stopKey = (e) =>{
        e.preventDefault();
    }
    return (
        <div>
            <p className="formObjInner">Date</p>
            <input className="formDateInput" onKeyDown = {stopKey} id="addExerciseDate" type="datetime-local" onChange={loggedDateChange} max = {getToday()}></input>
        </div>
    )
}

export default ExerciseLoggedDateForm;