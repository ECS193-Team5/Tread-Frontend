import {useState, useEffect} from 'react';
import MedalObj from './MedalObj';
import axios from "axios";

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const MedalsScroll = (props) => {
    let [type] = useState(props.children.type);
    let [informationMap, setInformationMap] = useState([]);

    function getInProgressMedals(){
        // ask for progress medals
        // move to needed format

        var config = {
            method : 'post',
            url : backend_url + 'medals/get_in_progress',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
        };
        axios(config)
        .then(function(response){
            setInformationMap(response.data)
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });
    }

    function getEarnedMedals(){
        // ask for earned medals
        // move to needed format
        var config = {
            method : 'post',
            url : backend_url + 'medals/get_earned',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
        };
        axios(config)
        .then(function(response){
            setInformationMap(response.data)
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });
    }


    function createObj(input){
        if(type === "earned"){
            return(<MedalObj>{input}</MedalObj>);
        }
        else if(type === "progress"){
            return(<MedalObj>{input}</MedalObj>);
        }
    }

    useEffect(
        () => {
          if (type === "earned") {
            getEarnedMedals();
          }
          else if(type === "progress"){
            getInProgressMedals();
          }
        }, [type]
      );
    return (
        <div id = "MedalsScroll">
            {informationMap.map(createObj)}
        </div>
    );
}

export default MedalsScroll;