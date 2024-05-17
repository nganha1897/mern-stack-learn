import React, { Component } from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TestComponent from "./common/test";
import Footer from "./common/FooterComponent";
import Home from "./common/HomeComponent";
import Header from "./common/HeaderComponent";
import About from "./common/AboutComponent";
import NotFound from "./common/NotFoundComponent";

export default class ApplicationComponent extends Component {
  
  //props - set of properties html + js which needs to be available in every component
  // also parent component can share data to child using props
  constructor(props) {
    super(props); //sync the props values to parent/base class

    //define the state and initialize the state
    this.state = {
      name : "Ha Tran Googler"
    }
  }
  
  //the parameter will be accepted here when function executes in child component
  updateName = (value) => {
    //alert("update name")
    // let nameElem = document.getElementById("name_element")
        // nameElem.innerText = "Yao"
        //nameElem.innerText = "David"

    

    //update state to create new virtual dom using setState api
    this.setState({
      name : value
    })

  }
  render() {
      //let name = "Tran"
      return (
        <Router>
          <div className = "topdiv">
          <b>username = {this.state.name}</b>
          <Header username={this.state.name}/>
          <Routes>
            <Route path="/" element={<Home parentName1={this.state.name} 
              updateNameInParent={this.updateName}/>}/>
            <Route path="home" element={<Home parentName1={this.state.name}
              updateNameInParent={this.updateName}/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="about/:id" element={<About />}/>
            <Route path="*" element={<NotFound/>}/>   
          </Routes>
          <Footer/>
          </div>          
        </Router>
      )
    }
}

// render(){
//         //let name = "Suyash Talekar!!!"
//         return(
//             <Router className="topdiv">
//             {/* <div className="topdiv"> */}
//                 {/* <h4>This is main react application Component</h4>
//                 <h5><b id="name_element">{this.state.name}</b></h5> 
//                 <TestComponent/>
//                 <button onClick={this.updateName} >Update Name</button>
//                 */}

//                 <Header/>
//                 <Home parentName={this.state.name}/>              
//                 <About />
//                 <Footer/> 

                
//             {/* </div> */}
//             </Router>
//         )
//     } 