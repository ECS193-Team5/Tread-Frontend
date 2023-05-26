import React from "react";
import SideBar from "../components/Shared/SideBar";
import Header from "../components/Shared/Header";
import FriendSection from "../components/Social/FriendSection";
import LeagueSection from "../components/Social/LeagueSection";
import RowBox from "../components/Social/RowBox";

import '../css/Shared/page.css'
const Social = (props) => {

    return (
        <div data-testid="SocialComponent" id = "Social" className='Body2Part'>
            <div className = "leftSide2Part">
                <SideBar></SideBar>
            </div>

            <div className = "rightSide2Part">
                <div className = "mainInfo">
                    <Header>{{"title":"Social Hub", "type":"social", "onButton" : props.children.type}}</Header>
                    <div className="extraInfo">
                        <RowBox>{{"informationType": "Recent", "socialType": props.children.type}}</RowBox>
                        <RowBox>{{"informationType": "Suggest", "socialType": props.children.type}}</RowBox>
                    </div>
                    {
                        (props.children.type === "friend") ?
                        <FriendSection></FriendSection>
                        :
                        <LeagueSection/>
                    }
                </div>
            </div>


        </div>
      );
}
export default Social;