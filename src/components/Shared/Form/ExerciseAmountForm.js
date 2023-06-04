import React, {useState, useEffect} from "react";

const ExerciseAmountForm = (props) => {
    const [amountError, setAmountError] = useState("");
    const amountChange = (event) => {
        let targetAmount = event.target.value;

        if (targetAmount <= 0){
            setAmountError("Exercise Amount must be greater than zero.");
            props.updateAmount(0);
            return;
        }
        else if(targetAmount >= 1000000){
            setAmountError("Exercise Amount must be less than 1000000.");
            props.updateAmount(0);
            return;
        }
        setAmountError("");
        props.updateAmount(targetAmount);
    }

    const unitChange = (event) => {
        props.updateUnit(event.target.value);
    }

    useEffect (
        () => {
            document.getElementById("addChallengeFormSelect").value = props.defaultUnit;
        }, [props.defaultUnit]
    );

    useEffect (
        () => {
            if(props.defaultAmount){
                setAmountError("");
            }
        }, [props.defaultAmount]
    );


    function preventEKey(event){
        if(event.key === "e" || event.key === "E"){
            event.preventDefault();
        }
    }

    return (
        <div data-testid="ExerciseAmountFormComponent" className="formObj">
            <p className="formObjInner">How much?</p>
            <div className="formObjInner">
                <input data-testid="ExerciseAmountFormExerciseAmountInput" className="formTextInput" min = "0" placeholder={props.defaultAmount} type="number" onChange={amountChange} onKeyDown={ preventEKey }/>
                <select data-testid="ExerciseAmountFormUnitSelect" id = "addChallengeFormSelect" className="formSelect" onChange={unitChange}>
                    <option value = "min">minute (min)</option>
                    <option value = "hr">hour (hr)</option>

                    <option value = "m">meter (m)</option>
                    <option value = "km">kilometer (km)</option>
                    <option value = "ft">feet (ft)</option>
                    <option value = "yd">yard (yd)</option>
                    <option value = "mi">mile (mi)</option>

                    <option value = "ct">count (ct)</option>
                </select>
            </div>
            <p data-testid="ExerciseAmountFormAmountError" className = "errorBox">{amountError}</p>
        </div>
    );
}

export default ExerciseAmountForm;