//create the connect method and add that to the component
//react-redux 
import React, { Component } from "react";
import { connect } from "react-redux";
import { AddUserToStore, SaveUserToDB } from "../../../state/user/userAction";
import UserComponent from "./UserComponent.jsx";
//import AdminComponent from "./AdminComponent.jsx";

let globalCondition = "If we need to show admin login"

let mapStateToProps = (store) => { //store is the redux states
  return {
      user : store.userReducer.user
  //user - will be accessed as props.user in component
  }
}

//mapDispatchToProps -- allows us to send data back to store to update in reducer
let mapDispatchToProps = (dispatch)=>{
  return {
      addUser : (user)=>{
        dispatch(AddUserToStore(user))
      },
      loginUser : (user) => {
        dispatch(SaveUserToDB(user))
      }
  }
}

// if (globalCondition) {
//   export default connect(mapStateToProps, mapDispatchToProps)(UserComponent)
// } else {
//   export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent)
// }

////export default connect(mapStateToProps, mapDispatchToProps)(globalCondition ? UserComponent : AdminComponent)    

//connect accepts - mapStateToProps - for subscribing and mapDispatchToProps - for publishing
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent)