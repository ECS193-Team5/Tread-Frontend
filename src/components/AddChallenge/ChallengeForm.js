import {useState} from 'react';
import Line from "../Shared/Line";
import axios from 'axios';
import ChallengeStats from "./ChallengeStats";
import ExerciseNameForm from "../Shared/Form/ExerciseNameForm";
import ExericseAmountForm from "../Shared/Form/ExerciseAmountForm";
import ExerciseDateForm from "../Shared/Form/ExerciseDateForm";
import ExerciseReceiverForm from '../Shared/Form/ExerciseReceiverForm';
import '../../css/Shared/form.css';
import '../../css/Shared/button.css';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const ChallengeForm = () =>{
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

    const submitChallenge = () => {
        if (!checkValidInputs()){
          return false;
        }

        let recipient = receiver
        if (receiverGroup === "league"){
          recipient = receiver.split('-')[1].trim();
        }

       var config ={
          method : 'post',
          url : backend_url+"challenges/add_"+receiverGroup+"_challenge",
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
          data :
          {
            receivedUser : recipient,
            issueDate : issueDate.valueOf(),
            dueDate : dueDate.valueOf(),
            unit : unit,
            amount : amount,
            exerciseName : exerciseName,
          }
        };
        axios(config)
        .then(function(response){
          window.location.href = "./currentChallengePage";
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/loginPage";
            }
          setSubmitError("Error in issuing challenge");
          console.log(error)
        })

    }

    return (
        <div id = "ChallengeForm" className = "Form">
            <h1>Challenges</h1>
            <h2>Create a Challenge</h2>
            <Line/>
            <ChallengeStats updateInputs = {updateInputs}/>
            <ExerciseNameForm defaultExerciseName = {defaultExerciseName} updateExerciseName = {setExerciseName}/>
            <ExericseAmountForm defaultAmount = {defaultAmount} defaultUnit = {defaultUnit} updateAmount = {setAmount} updateUnit = {setUnit}/>
            <ExerciseDateForm defaultIssueDate = {defaultIssueDate} defaultDueDate =  {defaultDueDate} updateIssueDate = {setIssueDate} updateDueDate = {setDueDate} />
            <ExerciseReceiverForm updateReceiver = {setReceiver} updateReceiverGroup = {setReceiverGroup}/>


            <div className = "formObj">
            <button className="submitButton" onClick = {submitChallenge}><p className = "submitButtonText">Submit</p></button>
            <p className = "errorBox">{submitError}</p>
            </div>

        </div>
    );
}

export default ChallengeForm;
