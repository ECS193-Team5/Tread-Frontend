import React, {useState} from "react";
const DisplayNameForm = (props) => {
    const [displayError, setDisplayError] = useState("");

    function validateDisplayName(event) {
        let displayNameInput = event.target.value;
        if (displayNameInput.length === 0 || displayNameInput.length > 32) {
            setDisplayError("Cannot sign up, display name must be between 1-32 characters");
            props.updateDisplayName("");
            return false;
        }

        if (!(/^[a-z0-9 ]+$/i.test(displayNameInput))) {
            setDisplayError("Display Name input must only have alphanumeric characters and spaces");
            props.updateDisplayName("");
            return false;
        }

        setDisplayError("");

        props.updateDisplayName(displayNameInput);
        return true;
    }

    return (
        <div data-testid="DisplayNameFormComponent">
            <h2>Display Name</h2>
            <p className="formObjInner">This is public name that others will see.</p>
            <input data-testid="DisplayNameFormDisplayNameInput" className="formTextInput wordFormTextInput" type="text" placeholder = {props.placeholder} onChange={validateDisplayName} />
            <p data-testid="DisplayNameFormDisplayError" className="errorBox">{displayError}</p>
        </div>
    );
}

export default DisplayNameForm;