import {useState, useEffect} from 'react';
import QRcode from "qrcode";
import {createLeaguePictureURL} from "../../helpers/CloudinaryURLHelpers";
import { getLeagueInfo, getNumberActiveChallengesLeague, getMembersLeague, getLeagueRole } from '../../routes/league';
import "../../css/Shared/pictureHeader.css";
import "../../css/Shared/button.css";
import "../../css/Shared/coloredText.css";



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
                getLeagueInfo(props.children.id, setLeagueInfo);
                getNumberActiveChallengesLeague(props.children.id, setNumberChallenges);
                setLeaguePhoto(createLeaguePictureURL(props.children.id));
                getMembersLeague(props.children.id, getNumberMembers)
                getLeagueRole(props.children.id, setRole);
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

    const getNumberMembers = (response) =>{
        setNumberMembers(response.data.length);
    }

    const setLeagueInfo = (response) => {
        setLeagueName(response.data.leagueName);
        setLeagueDescription(response.data.leagueDescription);
        setLeagueTypeText(response.data.leagueType);
    }

    const moveEditPage = () => {
        window.location.href = "./leagueEditPage?="+props.children.id;
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
                            (role === "owner")?
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