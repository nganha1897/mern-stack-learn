import React from 'react';

let SuccessChild = (props) => {
  
  return (
    <div>
      <h2>Child component receives props from parent: </h2>
      <h3>name: {props.name}</h3>
      <h3>address: {props.address}</h3>
      <h3>SuccessStory component: {props.successStory}</h3>
    </div>
  )
}

export default SuccessChild;