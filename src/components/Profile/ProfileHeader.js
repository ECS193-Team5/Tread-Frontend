import React, { useState, useEffect } from 'react';
import QRcode from "qrcode";
import { createProfilePictureURL } from "../../helpers/CloudinaryURLHelpers";
import { setLocation } from '../../helpers/CssEffects';
import editButtonImage from "../../assets/editButton.png";
import { getUsername, getDisplayName } from '../../routes/user';
import "../../css/Shared/button.css";
import "../../css/Shared/pictureHeader.css";

const ProfileHeader = () => {
    const [load, setLoad] = useState(false);
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [qrcode, setQRCode] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");


    const processUsername = (username) => {
        setUsername(username)
        setProfilePhoto(createProfilePictureURL(username));
    }

    useEffect(
        () => {
            if (!load) {
                getUsername(processUsername);
                getDisplayName(setDisplayName);
                setLoad(true);
            }
        }, [load]
    );

    useEffect(
        () => {
            if (username !== "") {
                getQrCode();
            }
        }, [username]
    );

    const getQrCode = () => {
        let url = "https://tread.run/requestFriend?" + username;
        QRcode.toDataURL(url, { "color": { "light": "#D9D9D9" } }, (err, url) => {
            if (err) return console.error(err)
            setQRCode(url);
        })
    }

    const moveSettingsPage = () => {
        setLocation("./profileSettingsPage");
    }

    return (
        <div data-testid="ProfileHeaderComponent" className="pictureHeader">
            <div className="pictureHeaderLeft">
                <div className="pictureHeaderFarLeft">
                    <div className = "pictureHolderDiv">
                        <img className="picture" src={profilePhoto} alt="profile"></img>
                    </div>
                </div>
                <div className="pictureHeaderMiddle">
                    <div id="pictureHeaderContent">
                        <h2>{username}</h2>
                        <h3>{displayName}</h3>
                    </div>
                    <div id = "pictureHeaderButton">
                        <button data-testid="ProfileHeaderMoveSettingPageButton" className="editButton" onClick={moveSettingsPage}><img className="editButtonImage" src={editButtonImage} alt="edit button"></img></button>

                    </div>
                </div>
            </div>
            <div className = "picturHeaderRight">
                <div className = "pictureHolderDiv">
                    <img className="qrcodeImage" src={qrcode} alt="qr code for friend request"></img>
                </div>
            </div>
        </div>
    )

}

export default ProfileHeader;