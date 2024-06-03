import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';  //replacement of mapStateToProps

let Header = (props) => {

  //allows us to read data from store/reducer as we do with mapStateToProps
  const user = useSelector((store) => store.userReducer.user)
  const userName = user && user.userName ? user.userName : props.userName
  return (
    <>
      <h3>Hi {userName}! Welcome to Shopping Cart sponsored by Tech Team SIT</h3>
      <div>
        <NavLink to="/home" className="button" activeclassname>Home</NavLink>
        <NavLink to="/user" className="button" activeclassname>Login</NavLink>
        <NavLink to="/student" className="button" activeclassname>Student</NavLink>
        <NavLink to="/product" className="button" activeclassname>Product</NavLink>
        <NavLink to="/cart" className="button" activeclassname>Cart</NavLink>
        <NavLink to="/about" className="button" activeclassname>About</NavLink>
      </div>
    </>
  )
}
export default Header;