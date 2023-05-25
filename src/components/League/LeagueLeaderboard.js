import LeagueLeaderboardEntry from "./LeagueLeaderboardEntry";
import React, {useState, useEffect} from "react";
import {setDisplayProperty} from "../../helpers/CssEffects";
import "../../css/League/leagueDescriptionPage.css";
import axios from 'axios';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const LeagueLeaderboard = (props) => {
    let leagueID = props.children.id;
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [load, setLoad] = useState(false);

    function getLeaderboardInfo(){
        var config ={
            method: 'post',
            url : backend_url+'league/get_leaderboard',
            headers: {
                Accept: 'application/json',
              },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: leagueID
            }
          };
          axios(config)
          .then(function(response){
            let information_list = response.data;

            for(let i = 0; i< information_list.length; i++){
                information_list[i]["level"] = i+1;
            }
            setLeaderboardInfo(information_list);
          })
          .catch(function(error){
              if(error.response.status===401){
                window.location.href = "/";
            }
          });
    }
    useEffect(
        () => {
          if (!load) {
            getLeaderboardInfo();
            setLoad(true);

          }
        }, [load]
      );

      useEffect(
        () => {
          if (leaderboardInfo.length === 0) {
            setDisplayProperty("LeagueLeaderboard", "none")
          }
          else if(leaderboardInfo){
            setDisplayProperty("LeagueLeaderboard", "block")
          }
        }, [leaderboardInfo]
      );


    // Send out the request
    // set the information to map
    function makeLeaderboardEntryObj(input, index){
        return (<LeagueLeaderboardEntry index = {index}>{input}</LeagueLeaderboardEntry>)
    }
    return(
        <div id = "LeagueLeaderboard">
            <h2>League Leaderboard</h2>

            <div id = "LeagueLeaderboardExterior">
              <div id = "LeagueLeaderboardList">
                  {leaderboardInfo.map(makeLeaderboardEntryObj)}
              </div>
            </div>
        </div>

    );

}

export default LeagueLeaderboard;