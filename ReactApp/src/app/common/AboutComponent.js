import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//a functional component using arrow function
let About = () => {
  let params = useParams();
  let param = params && params["id"] ? params["id"] : "No Params";

  //using functional hook - useState is replacement of setState and state
  let [userName, setUserName] = useState("Ha Tran");   
  let [userAge, setUserAge] = useState(26);
  //let [user, setUser] = useState({userName: "Ha Tran", age: 26})

  //first hook that we are using in application
  let goToHome = useNavigate(); //helps to create route table on the fly and intercepted by BrowserRouter

  let onGoToHomeClick = (evt) => {
    //goToHome("/home");
    setUserName("Ha");
    evt.preventDefault(); //it stops the default behaviour like event propagation
  };

  return (
    <div className="about">
      <h2>We promise to support .... </h2>
      <p className="about-content">
        If you’re looking for a job—a great job—we can help you get in the door
        at some incredible companies. Need to hire good people? We know
        thousands. Let us introduce you. No matter where you are, we can help
        you get where you want to go in your career.
      </p>
      <p>id = {param}</p>
      <p>Sum of Params = {param + param}</p>
      <p>Multiple of Params = {param * param}</p>

      <button
        className={"form-control btn btn-primary col-md-1"}
        onClick={onGoToHomeClick}
      >
        Go To Home
      </button>

      <h4>{userName}</h4>
    </div>
  );
};
export default About;
