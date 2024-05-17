import React from 'react';
import { NavLink } from "react-router-dom";

let Header = (props) => {
  return (
    <>
      <h2>Header Component</h2>
      <h3>{props.username}</h3>
      <NavLink to="/home" className="button" activeclassname>Home</NavLink>
      <NavLink to="/user" className="button" activeclassname>Login</NavLink>
      <NavLink to="/about" className="button" activeclassname>About</NavLink>
      <NavLink to="/about/2500" className="button" activeclassname>About with Param</NavLink>
    </>
  )
}
export default Header;