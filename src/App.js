import "./App.css";
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ProfileSettings from "./pages/profileSettings";
import AddChallenge from "./pages/addChallenge";
import AddLeague from "./pages/addLeague";
import Challenge from "./pages/challenge";
import Social from "./pages/social";
import Profile from "./pages/profile";
import League from "./pages/league";
import RedirectPage from "./pages/redirectPage";
import Privacy from "./pages/privacy";
import TestDiv from "./pages/test";
import DeleteAccountInfo from "./pages/deleteAccountInfo";
import Contact from "./pages/contact";

function App() {
  return (
    <div id = "page">
      <Router>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/signUpPage" element = {<SignUp/>} />
        <Route path = "/profileSettingsPage" element = {<ProfileSettings/>} />
        <Route path = "/addChallengePage" element = {<AddChallenge/>} />
        <Route path = "/addLeaguePage" element = {<AddLeague/>} />
        <Route path = "/currentChallengePage" element = {<Challenge>{{"type":"current"}}</Challenge>} />
        <Route path = "/globalChallengePage" element = {<Challenge>{{"type":"global"}}</Challenge>} />
        <Route path = "/socialFriendPage" element = {<Social>{{"type":"friend"}}</Social>}/>
        <Route path = "/socialLeaguePage" element = {<Social>{{"type":"league"}}</Social>}/>
        <Route path = "/profileMedalPage" element = {<Profile>{{"type":"medal"}}</Profile>} />
        <Route path = "/profileStatsPage" element = {<Profile>{{"type":"stats"}}</Profile>} />
        <Route path = "/leagueDescriptionPage?" element = {<League>{{"type":"description"}}</League>}/>
        <Route path = "/leagueEditPage?" element = {<League>{{"type":"edit"}}</League>}/>
        <Route path = "/leagueMemberPage?" element = {<League>{{"type":"member"}}</League>}/>
        <Route path = "/requestFriend?" element = {<RedirectPage type = "Friend"></RedirectPage>}/>
        <Route path = "/requestLeague?" element = {<RedirectPage type = "League"></RedirectPage>}/>
        <Route path = "/test" element = {<TestDiv/>}/>
        <Route path = "/privacy" element = {<Privacy/>}/>
        <Route path = "/deleteAccountInfo" element = {<DeleteAccountInfo/>}/>
        <Route path = "/contact" element = {<Contact/>}/>
      </Routes>
      </Router>
      </div>
  );
}
export default App;