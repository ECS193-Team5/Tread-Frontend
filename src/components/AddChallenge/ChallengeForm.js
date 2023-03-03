import Line from "../Shared/Line";
import {useState, useEffect} from 'react';
import '../../css/Shared/form.css'
import '../../css/Shared/button.css'
import '../../css/Shared/errorBox.css'

import axios from 'axios';
const backend_url = process.env.REACT_APP_BACKEND


const ChallengeForm = () =>{

    let sportList =  [
        "Aikido",
        "Archery",
        "Badminton",
        "Baseball",
        "Basketball",
        "Beach Volleyball",
        "Billards",
        "Bocce",
        "Bowling",
        "Boxing",
        "Brazilian Jiu-Jitsu",
        "Cheer",
        "Chess Boxing",
        "Cricket",
        "Cross-fit",
        "Cup Stacking",
        "Cycle",
        "Dodgeball",
        "Dressage",
        "Elliptical",
        "E-Sports",
        "Fish",
        "Football (American)",
        "Golf",
        "Gymnastics",
        "HIIT",
        "Hammer Throw",
        "Handball",
        "High Dive",
        "High Jump",
        "Hike",
        "Hockey",
        "Horse Racing",
        "Ice Skate",
        "Judo",
        "Karate",
        "Kickboxing",
        "Krav Maga",
        "Kung Fu",
        "Lacrosse",
        "Luge",
        "Martial Arts",
        "Netball",
        "Pickleball",
        "Pilates",
        "Pole Dance",
        "Polo",
        "Pool",
        "Quidditch",
        "Racquetball",
        "Rings (Gymnastics)",
        "Rock Climb",
        "Rodeo",
        "Rope Climb",
        "Rowing",
        "Rugby",
        "Run",
        "Sail",
        "Shot put",
        "Shuffleboard",
        "Skateboard",
        "Ski",
        "Sled",
        "Soccer",
        "Softball",
        "Speed Skate",
        "Spin",
        "Sport Kite",
        "Stairs",
        "Strech",
        "Surfing",
        "Swim",
        "Table Tennis",
        "Taekwondo",
        "Tennis",
        "Track and Field",
        "Treadmill",
        "Triathlon",
        "Volleyball",
        "Walk",
        "Water Polo",
        "Weightlifting (Lower Body)",
        "Weightlifting (Upper Body)",
        "Weightlifting",
        "Wrestling",
        "Yoga",
        "Other (Specify Below)",
        ];


    let [selfSpecify, setSelfSpecify] = useState(false);
    let [receiverGroup, setReceiverGroup] = useState("Self");
    let [inviteOptions, setInviteOptions] = useState([]);
    let [specifyErrorResponse, setSpecifyErrorResponse] = useState("");
    let [submitErrorResponse, setSubmitErrorResponse] = useState("");

    function validateSelfSpecify(event){
      let selfSpecify = event.target.value;
      if(selfSpecify.length === 0){
        setSpecifyErrorResponse("Self specified challenges need to be atleast 1 character long")
        return false;
      }

      setSpecifyErrorResponse("")
      setSelfSpecify(selfSpecify)
    }
    
    function sportChange(event){
        setSelfSpecify((event.target.value === "Other (Specify Below)"));
    }

    function receiverChange(event){
        setReceiverGroup(event.target.value);
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
      dateob.setDate(currentDate.getDate() + 1);

      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
  
      return (year + "-" + month + "-" + date);
    }

    function getFriends(){
        // use SetInviteOptions to make it a list of friend names
        var array_friends = []

        var config ={
            method: 'post',
            url : backend_url+'friend_list/friend_list',
            headers: {
                Accept: 'application/json',
              },
            withCredentials: true,
            credentials: 'include'
        };
        axios(config)
        .then(function(response){
            console.log("got the list");
            console.log(response.data.friends);
            setInviteOptions(response.data.friends);
        })
        .catch(function(error){
            console.log(error);
            console.log("No response")
        });
        // setInviteOptions(["friend1", "friend2", "friend3"]);
    }

    function getLeagues(){
        // use SetInviteOptions to make it a list of leagues that user is ADMIN or OWNER of
        var array_friends = []

        var config ={
            method: 'post',
            url : backend_url+'league/get_admin_leagues',
            headers: {
                Accept: 'application/json',
              },
            withCredentials: true,
            credentials: 'include'
        };
        axios(config)
        .then(function(response){
            console.log("got the list");
            console.log(response.data);
            setInviteOptions(response.data);
        })
        .catch(function(error){
            console.log(error);
            console.log("No response")
        });
        // setInviteOptions(["league1", "leauge2", "league3"]);
    }


    function submitChallenge(){
      if (specifyErrorResponse !== ""){
        setSubmitErrorResponse("Correct the highlighted fields to proceed")
        return false;
      }
      var url_challenge = ""
      if(receiverGroup === "Self"){
        url_challenge = backend_url+"/challenges/add_self_challenge"
      }
      else if(receiverGroup === "Friend"){
        url_challenge = backend_url+"/challenges/add_friend_challenge"
      }
      else if(receiverGroup === "League"){
        url_challenge = backend_url+"/challenges/add_league_challenge"
      }

      var config ={
        method : 'post',
        url : url_challenge,
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response){
        window.location.href = "./currentChallengePage";
      })
      .catch(function(err){
        setSubmitErrorResponse(err);
        console.log(err)
      })
      // Validate the input
            // If the user selects "self specify", there needs to be a string > length 1 in the field
                // -> if not, set the error response using setSpecifyErrorResponse();
            // All other fields should be locked by their own types and do not need to be validated
        // Sent the post request (make sure to select the exercise in the drop down or the self specify based on selfSpecify and only send one)
        // Check the post request response, set the submitErrorResponse message if it fails
        // if post succeeds, move to the current page
    }

    useEffect(
        () => {
          if (receiverGroup === "Friend") {
            getFriends();
          }
          else if(receiverGroup === "League"){
            getLeagues();
          }
        }, [receiverGroup]
      );


    return (
        <div id = "ChallengeForm" className = "Form">
            <h1>Challenges</h1>
            <h2>Create a Challenge</h2>
            <Line/>
            <div className = "formObj">
                <p className = "formObjInner">Exercise Type:</p>
                <div className = "formObjInner">
                    <select className = "formSelect" onChange = {sportChange}>
                        {sportList.map((name)=>{return <option value = {name}>{name}</option>;})}
                    </select>
                </div>

            </div>

            {selfSpecify ?
                <div className="formObj">
                    <p className = "formObjInner">Specify your own activity: </p>
                    <input className = "formObjInner" type = "text" onChange={validateSelfSpecify}/>
                    <p className = "errorBox">{specifyErrorResponse}</p>
                </div>
                :
                <></>
            }

            <div className = "formObj">
                <p className = "formObjInner">How much?</p>
                <div className = "formObjInner">
                    <input type = "number" min = "1" />
                    <select className = "formSelect">
                        <option value = "ct">ct</option>
                        <option value = "m">m</option>
                        <option value = "km">km</option>
                        <option value = "ft">ft</option>
                        <option value = "yd">yd</option>
                        <option value = "mi">mi</option>
                        <option value = "min">min</option>
                        <option value = "hr">hr</option>
                    </select>
                </div>
            </div>

            <div className = "formObj">
                <p className = "formObjInner">Start Date</p>
                <input id="issueDate" className = "formObjInner" type = "date" min = {getToday()}></input>
            </div>

            <div className = "formObj">
                <p className = "formObjInner">End Date</p>
                <input id="dueDate" className = "formObjInner" type = "date" min = {getTomorrow()}></input>
            </div>

            <div className = "formObj">
                <p className = "formObjInner">What kind of challenge?</p>
                <div className = "formObjInner">
                    <select className="formSelect" onChange = {receiverChange}>
                        <option value = "Self">Self</option>
                        <option value = "Friend">Friend</option>
                        <option value = "League">League</option>
                    </select>
                </div>
            </div>

            { (receiverGroup  != "Self") ?
            <div className = "formObj">
                <p className = "formObjInner">Who should receive the challenge?</p>
                <div>
                    <select>
                    {inviteOptions.map((name)=>{return <option>{name}</option>;})}
                    </select>
                </div>
            </div>

            :

            <></>

            }
            <div className = "formObj">
            <button className="submitButton" onClick = {submitChallenge}><p className = "submitButtonText">Submit</p></button>
            <p className = "errorBox">{submitErrorResponse}</p>
            </div>

        </div>
    );
}

export default ChallengeForm;