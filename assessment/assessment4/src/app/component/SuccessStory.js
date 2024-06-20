import React from "react";

let SuccessStory = (props) => {

  let upgradeSuccessStatus = (evt) => {
    props.updateStatus("Success")
    evt.preventDefault()
  }

  return (
    <>
      <b>This is success story component</b>
      <hr/>
      <button onClick={upgradeSuccessStatus}>Upgrade Success Status</button>
    </>    
  )
}

export default SuccessStory;