import "../css/SignUp/SignUp.css"

import SignUpSideBar from "../components/SignUp/SignUpSideBar";
import SignUpForm from "../components/SignUp/SignUpForm";
const SignUp = () => {
    return (
        <div id = "SignUp">
            <SignUpSideBar id = "SignUpBar"/>
            <SignUpForm id = "SignUpForm"/>
        </div>
    );
}

export default SignUp;