console.log("This is the first file in front end application!!!")

import React from "react";
import * as ReactDOM from "react-dom/client";

import ApplicationComponent from "./app/appComponent";
import TestComponent from "./app/common/test";
//creating root of the react application where we can load the react app
const root = ReactDOM.createRoot(document.getElementById("root"));

//bootstrapping react application in root element of index.html
root.render(
  <ApplicationComponent/>
)