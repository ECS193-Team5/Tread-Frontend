

const ExerciseLoggedDateForm = (props) => {
    const loggedDateChange = (event) => {
        props.updateLoggedDate(new Date(event.target.value));
    }

    function getToday(){
        let date_ob = new Date()

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        return (year + "-" + month + "-" + date);
    }

    const stopKey = (e) =>{
        e.preventDefault();
    }
    return (
        <div>
            <p className="formObjInner">Date</p>
            <input className="formDateInput" onKeyDown = {stopKey} id="addExerciseDate" type="date" onChange={loggedDateChange} max = {getToday()}></input>
        </div>
    )
}

export default ExerciseLoggedDateForm;