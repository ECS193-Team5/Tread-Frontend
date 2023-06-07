import React, {useState} from "react";
const UsernameForm = (props) => {
    const [usernameError, setUsernameError] = useState("");
    function validateUsername(event){
        let usernameInput = event.target.value;
        if (usernameInput.length === 0 || usernameInput.length > 32){
            setUsernameError("Cannot sign up, username needs to be between 1-32 characters");
            props.updateUsername("");
            return false;
        }

        if (!(/^[a-z0-9]+$/i.test(usernameInput))) {
            setUsernameError("Cannot sign up, username should be alphanumeric");
            props.updateUsername("");
            return false;
        }

        setUsernameError("");
        props.updateUsername(usernameInput);
    }

    return (
        <div data-testid="UsernameFormComponent" className="formObj">
                <h2>Username</h2>
                <p className="formObjInner">This is a unique identifier for your account. It is public.</p>
                <input data-testid="UsernameFormUsernameInput" className="formTextInput" type = "text"  onChange = {validateUsername}/>
                <p data-testid="UsernameFormUsernameError" className = "errorBox">{usernameError}</p>
        </div>
    )
}

export default UsernameForm;