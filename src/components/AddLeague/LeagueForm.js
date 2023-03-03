import Line from "../Shared/Line";
import PhotoUpload from "../Shared/PhotoUpload";
import '../../css/Shared/form.css'
import '../../css/Shared/button.css'
import '../../css/Shared/errorBox.css'
import { useState } from "react";

const LeagueForm = () => {
    const [photo, setPhoto] = useState("https://i.imgur.com/sXwXq45.png");
    const [leagueName, setLeagueName] = useState("");
    const [leagueDescription, setLeagueDescription] = useState("");
    const [leagueType, setLeagueType] = useState("");
    const [leagueTypeErrorResponse, setLeagueTypeErrorResponse] = useState("");
    const [leagueNameErrorResponse, setLeagueNameErrorResponse] = useState("");
    const [leagueDescriptionErrorResponse, setLeagueDescriptionErrorResponse] = useState("");
    const [submitErrorResponse, setSubmitErrorResponse] = useState("");

    function uploadPhoto(){
        setPhoto(photo);
    }

    function validateLeagueDescription(event){
      let league_description = event.target.value;
      if (league_description.length > 255){
        setLeagueDescriptionErrorResponse("Description too Long")
        return false;
      }  

      setLeagueDescriptionErrorResponse("")
      setLeagueDescription(league_description);
      // check valid league description, use setLeagueDescriptionError
        // if valid, use setLeagueDescription
    }

    function validateLeagueName(event){
      let league_name = event.target.value;
      if (league_name.length === 0 || leagueName.length > 32){
        setLeagueNameErrorResponse("Cannot create League, League Name must be between 1-32 characters")
        return false
      }  

      if (!(/^[a-z0-9]+$/i.test(league_name))) {
        setLeagueNameErrorResponse("Cannot create league, League Name should be alphanumeric");
        return false;
      }

      if ((/^\s+$/i.test(league_name))) {
        setLeagueNameErrorResponse("Cannot create league, League Name can't be a string of spaces");
        return false
      }

      setLeagueNameErrorResponse("");
      setLeagueName(league_name);
      // check valid league name, use setLeagueNameError
        // if valid, use setLeagueName
    }

    function submitLeague(){
      if (leagueNameErrorResponse !== "" || leagueDescriptionErrorResponse !== ""){
        setSubmitErrorResponse("Correct the highlighted fields to proceed")
        return false;
      }  
      
      var config = {
        method : 'post',
        url : backend_url + 'league/create_league',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      };
      axios(config)
      .then(function(response){
        window.location.href = "./socialLeaguePage";
      })
      .catch(function(error){
        setSubmitErrorResponse(error)
        console.log(error)
      });
      // check if any errors, yse setSubmitErrorResponse
        // send information
        // if unsuccesful, use setSubmitErrorResponse
        // if succesfful, navigate away from the page
    }


    return (
        <div id = "LeagueForm" className="Form">
            <h1>Social Hub</h1>
            <h2>Create a League</h2>
            <Line/>

        <div className="formObj">
            <p className="formObjInner">League Picture</p>
            <PhotoUpload defaultImage = {photo} func = {uploadPhoto}></PhotoUpload>
        </div>

        <div className="formObj">
            <p className="formObjInner">League Name</p>
            <input className="formTextInput" type = "text"  onChange = {validateLeagueName}/>
            <p className = "errorBox">{leagueNameErrorResponse}</p>
        </div>

        <div className="formObj">
            <p className="formObjInner">League Description</p>
            <input className="formTextInput" onChange = {validateLeagueDescription} type = "text"/>
            <p className = "errorBox">{leagueDescriptionErrorResponse}</p>
        </div>

        <div className="formObj">
            <p className="formObjInner">What type of league?</p>
            <p className="formObjInner">In a private league, you the owner, will have to accept join requests.</p>
            <p className="formObjInner">In a public league, anyone can join</p>
            <select id = "select box" onChange={setLeagueType()}>
                <option value = "private">Private</option>
                <option value = "public">Public</option>
            </select>
            <p className = "errorBox">{leagueTypeErrorResponse}</p>
        </div>

        <div className = "formObj">
            <button className="submitButton" onClick = {submitLeague}><p className = "submitButtonText">Submit</p></button>
            <p className = "errorBox">{submitErrorResponse}</p>
        </div>

        </div>
    );
}

export default LeagueForm;