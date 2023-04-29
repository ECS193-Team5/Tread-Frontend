import {useState, useEffect} from 'react';
import axios from "axios";
import QRcode from "qrcode";
import {createLeaguePictureURL} from "../../Helpers/CloudinaryURLHelpers";
import "../../css/Shared/pictureHeader.css";
import "../../css/Shared/button.css";
import "../../css/Shared/coloredText.css";

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const LeagueHeader = (props) => {
    const [id] = useState(props.children.id);
    const [role, setRole] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [leagueName, setLeagueName] = useState();
    const [numberMembers, setNumberMembers] = useState();
    const [numberChallenges, setNumberChallenges] = useState();
    const [leagueDescription, setLeagueDescription] = useState();
    const [leagueType, setLeagueType] = useState();
    const [leaguePhoto, setLeaguePhoto] = useState();
    const [qrCode, setQRCode] = useState("");

    useEffect (
        () => {
            if(!loaded){
                generateQRCode();
                getLeagueInfo();
                getNumberChallenges();
                getLeaguePhoto();
                getNumberMembers();
                getRole();
                setLoaded(true);
            }
        }, [loaded]
    );

    const generateQRCode = () => {
        let url = "https://tread.run/requestLeague?" + id;
        QRcode.toDataURL(url, {"color":{"light":"#D9D9D9"}}, (err, url) => {
            if (err) return console.error(err)

            setQRCode(url);
        })
    }

    const setLeagueTypeText = (type) => {
        if (type === "private"){
            setLeagueType("Private League");
        }
        else{
            setLeagueType("Public League");
        }
    }
    function getLeagueInfo(){
        var config  = {
          method : 'post',
          url: backend_url+'league/get_league_name_description_type',
          headers: {
              Accept: 'application/json',
            },
          withCredentials: true,
          credentials: 'include',
          data : {
            leagueID: id
          }
        };
        axios(config)
        .then(function(response) {
            setLeagueName(response.data.leagueName);
            setLeagueDescription(response.data.leagueDescription);
            setLeagueTypeText(response.data.leagueType);
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/loginPage";
            }
            console.log(error)
        });
    }

    function getRole(){
        var config  = {
          method : 'post',
          url: backend_url+'league/get_role',
          headers: {
              Accept: 'application/json',
            },
          withCredentials: true,
          credentials: 'include',
          data : {
            leagueID: props.children.id
          }
        };
        axios(config)
        .then(function(response) {
            setRole(response.data);
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/loginPage";
            }
            console.log(error)
        });
    }

    function getNumberChallenges(){
        var config = {
            method : 'post',
            url : backend_url + 'league/get_league_active_challenges',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
        };
        axios(config)
        .then(function(response){
            setNumberChallenges(response.data);
        })
        .catch(function(error){
            console.log(error)
        });
    }

    function getLeaguePhoto(){
        setLeaguePhoto(createLeaguePictureURL(id));
    }

    function getNumberMembers(){
        var config = {
            method : 'post',
            url : backend_url + 'league/get_member_list',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
        };
        axios(config)
        .then(function(response){
            setNumberMembers(response.data.length);
        })
        .catch(function(error){
            console.log(error)
        });
    }

    const moveEditPage = () => {
        window.location.href = "./leagueEditPage?="+id;
    }

    return(
        <div className = "pictureHeader">
            <div className = "pictureHeaderLeft">
                <div className = "pictureHeaderFarLeft">
                    <div className = "pictureHolderDiv">
                        <img className = "picture" src = {leaguePhoto} alt = "league"/>
                    </div>
                </div>
                <div className = "pictureHeaderMiddle">
                    <div className = "pictureHeaderContent">
                        <h2>{leagueName}</h2>
                        <p className = "pictureHeaderText">Description: {leagueDescription}</p>
                        <p className = "pictureHeaderText">{leagueType}<br></br>{numberChallenges} Active Challenges  <br></br>{numberMembers} Members</p>
                    </div>
                    <div className = "pictureHeaderButton">
                        {
                            (role === "admin" || role === "owner")?
                            <button className = "editButton" onClick = {moveEditPage}><img className = "editButtonImage" src = {"https://i.imgur.com/but4GRp.png"} alt = "edit button"></img></button>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
            <div className = "pictureHeaderRight">
                <img className = "qrcodeImage" src = {qrCode} alt = "qr code for friend request"></img>
            </div>
        </div>
    )

}

export default LeagueHeader;