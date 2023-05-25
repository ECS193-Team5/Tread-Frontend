import React from "react";

const ProgressBar = (props) => {
  function min(a,b){
    if (a<b){
      return a;
    }
    return b;
  }
    let completed = min(100, props.children.completed);
    // Code lifted from here : https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl
    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50
    }

    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: "#014421",
      borderRadius: 50,
      textAlign: 'right'
    }

    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }

    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{``}</span>
        </div>
      </div>
    );
  };

  export default ProgressBar