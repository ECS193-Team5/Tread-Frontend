import SideBar from '../components/Shared/SideBar';
import Header from '../components/Shared/Header';
import Line from "../components/Shared/Line";
import StatsExerciseSection from '../components/Profile/StatsExerciseSection';
import MedalsSection from '../components/Profile/MedalsSection';
import ProfileHeader from "../components/Profile/ProfileHeader";
import '../css/Shared/page.css';
import StatsChallengeSection from '../components/Profile/StatsChallengeSection';
import MailBox from '../components/Profile/MailBox';

const Profile = (props) => {
    return (
        <div id = "Profile" className='Body2Part'>
            <div className = "leftSide2Part">
                <SideBar></SideBar>
            </div>
            <div className = "rightSide2Part">
                <div className = "mainInfo">
                    <Header>{{"title":"Profile", "type":"profile", "onButton":props.children.type}}</Header>
                    <ProfileHeader></ProfileHeader>
                    <Line/>
                    <MailBox></MailBox>
                    {
                        (props.children.type === "stats") ?
                        <div>
                        <StatsExerciseSection/>
                        <Line></Line>
                        <StatsChallengeSection/>
                        </div>
                        :
                        <MedalsSection/>
                    }
                </div>
            </div>

        </div>
      );
}

export default Profile;