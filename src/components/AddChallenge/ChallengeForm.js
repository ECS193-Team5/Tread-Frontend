import React, {useState, useEffect} from 'react';
import Line from "../Shared/Line";
import ChallengeStats from "./ChallengeStats";
import ExerciseNameForm from "../Shared/Form/ExerciseNameForm";
import ExericseAmountForm from "../Shared/Form/ExerciseAmountForm";
import ExerciseDateForm from "../Shared/Form/ExerciseDateForm";
import ExerciseReceiverForm from '../Shared/Form/ExerciseReceiverForm';
import { addChallenge } from '../../routes/challenges';
import '../../css/Shared/form.css';
import '../../css/Shared/button.css';

const ChallengeForm = () =>{
    const [load, setLoad] = useState(false);
    const [exerciseName, setExerciseName] = useState("");
    const [defaultExerciseName, setDefaultExerciseName] = useState("");
    const [unit, setUnit] = useState("min");
    const [defaultUnit, setDefaultUnit] = useState("min");
    const [amount, setAmount] = useState(0);
    const [defaultAmount, setDefaultAmount] = useState(0);
    const [issueDate, setIssueDate] = useState("");
    const [defaultIssueDate, setDefaultIssueDate] = useState();
    const [dueDate, setDueDate] = useState("");
    const [defaultDueDate, setDefaultDueDate] = useState();
    const [receiverGroup, setReceiverGroup] = useState("self");
    const [receiver, setReceiver] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [defaultReceiverGroup, setDefaultReceiverGroup] = useState("");
    const [defaultReceiver, setDefaultReceiver] = useState("");

    useEffect(
      () => {
          if (!load) {
              let url = window.location.href;
              let encodedInfo = url.split("?prefill=");

              if(encodedInfo.length > 1){
                let information = encodedInfo[1].split(".");
                if(information.length == 2){
                  setDefaultReceiverGroup(information[0].toLowerCase());
                  setDefaultReceiver(information[1].toLowerCase());
                }
              }
              setLoad(true);
          }
      }, [load]
  );

    const updateInputs = (data) => {
      if (data === "NA"){
        return;
      }

      setAmount(data.amount);
      setDefaultAmount(data.amount);
      setUnit(data.unit);
      setDefaultUnit(data.unit);
      setIssueDate(data.issueDate);
      setDefaultIssueDate(data.issueDate);
      setDueDate(data.dueDate);
      setDefaultDueDate(data.dueDate);
      setExerciseName(data.exerciseName);
      setDefaultExerciseName(data.exerciseName);
    }

    const checkValidInputs = () => {
      setSubmitError("");
      let errorMessage = "";
      if (exerciseName === ""){
        errorMessage += "Please give an exercise name.\n";
      }

      if(amount <= 0){
        errorMessage += "Please give an amount over zero.\n";
      }

      if(issueDate === ""){
        errorMessage += "Please give a valid issue date.\n";
      }

      if(dueDate === ""){
        errorMessage += "Please give a valid due date.\n";
      }

      if(receiverGroup !== "self" && receiver === ""){
        errorMessage += "Please select a recipient for your challenge.\n";
      }

      setSubmitError(errorMessage);
      return (errorMessage === "");
    }

    const setError = () => {
      setSubmitError("The challenge could not be issued. Please try again later.");
    }

    const moveChallengePage = () => {
      window.location.href = "./currentChallengePage";
    }

    const submitChallenge = () => {
        if (!checkValidInputs()){
          return false;
        }

        let recipient = receiver
        if (receiverGroup === "league"){
          recipient = receiver.split('-')[1].trim();
        }

        let inputData = {
          "receiverGroup":receiverGroup,
          data: {
            receivedUser : recipient,
            issueDate : issueDate.valueOf(),
            dueDate : dueDate.valueOf(),
            unit : unit,
            amount : amount,
            exerciseName : exerciseName}
        }

        addChallenge(inputData, moveChallengePage, setError);
    }

    return (
        <div id = "ChallengeForm" className = "Form" data-testid="ChallengeFormComponent">
            <h1>Challenges</h1>
            <h2>Create a Challenge</h2>
            <Line/>
            <ChallengeStats updateInputs = {updateInputs}/>
            <ExerciseNameForm defaultExerciseName = {defaultExerciseName} updateExerciseName = {setExerciseName}/>
            <ExericseAmountForm defaultAmount = {defaultAmount} defaultUnit = {defaultUnit} updateAmount = {setAmount} updateUnit = {setUnit}/>
            <ExerciseDateForm defaultIssueDate = {defaultIssueDate} defaultDueDate =  {defaultDueDate} updateIssueDate = {setIssueDate} updateDueDate = {setDueDate} />
            <ExerciseReceiverForm defaultReceiver = {defaultReceiver} defaultReceiverGroup = {defaultReceiverGroup} updateReceiver = {setReceiver} updateReceiverGroup = {setReceiverGroup}/>


            <div className = "formObj">
            <button data-testid="ChallengeFormSubmitButton" className="submitButton" onClick = {submitChallenge}><p className = "submitButtonText">Submit</p></button>
            <p data-testid="ChallengeFormErrorBox" className = "errorBox">{submitError}</p>
            </div>

        </div>
    );
}

export default ChallengeForm;
