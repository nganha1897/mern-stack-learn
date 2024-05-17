import React, { Component } from "react";

import {PropTypes} from "prop-types";

//this component implements shouldComponentUpdate in itself to reduce the render on state change
//export default class Home extends PureComponent {
export default class Home extends Component {
  // creation life cycle method

  constructor(props) {
    super(props); //props should not be updated here as it's readonly value
    this.state = {
      age: 17,
      username: props.parentName,
      refAddress: "Somewhere on earth",
      refAge: "Infinity"
    };
    this.incrementAgeLoop = null;
    this.incrementAgeVal = 17;
    this.incrementAge();

    //to access and update html directly
    this.address = React.createRef(); //this creates a reference which we link to html and then access it
    this.age = React.createRef();
  }

  incrementAge = () => {
    // this.incrementAgeLoop = setInterval(() => {
    //   this.incrementAgeVal++
    //   this.setState({
    //     age : this.state.age + 1
    //   })
    //   console.log(this.state.age)
    // }, 2000)
    // setTimeout(()=>{
    //   clearInterval(this.incrementAgeLoop)
    // },5000)
  };
  
  //html is rendered on browser, execute only after first render
  componentDidMount() {
    //we can access the html and make calls to server API here to pull the data
    this.address.current.value = "new name";
  }

  //destruction life cycle method
  componentWillUnmount() {
    //any api subsriptions, loops should be stopped here as this data may create mess
    console.log("componentWillUnmount - is called");
    //clearInterval(this.incrementAgeLoop)
  }
  //evt is js object which contains information about the control which invoked this event
  onTextChange = (evt) => {
    let element = evt.target;
    let value = element.value;

    let classList = element.classList

    if (classList.contains("username")) {
      //regex to check the email
      

      this.setState({
        username: value,
      });
    } else {
      //regex to check the number
      let newVal = value < 120 ? value : 0
      this.setState({
        age: newVal,
      });
    }

    

    //update the name back in parent by calling callback event
    this.props.updateNameInParent(value);

    evt.preventDefault(); //will explain in details
  };

  updateName = (evt) => {
    //set state follows with lifecycle methods and updates the states in batch process
    this.setState({
      age: this.state.username,
    });

    //not a recommended way but can call the render method after state update
    //it skips the life cycle methods like shouldComponentUpdate

    // this.state.age = this.state.username
    // this.forceUpdate()  //directly calls the render method to create virtual dom

    evt.preventDefault();
  };

  // do not implement this if in pure component
  //update life cycle method
  shouldComponentUpdate(nextPops, nextState) {
    console.log("nextPops ", nextPops);
    console.log("nextState ", nextState);
    if (this.state.age == nextState.username) {
      return false; // should not call render method to create virtual dom
    } else {
      return true; // keep calling render method
    }
  }

  getSnapshotBeforeUpdate(prevState, prevProps) {
    console.log("getSnapshotBeforeUpdate");
    console.log("prevState", prevState);
    console.log("prevProps", prevProps);
    return {
      prevState,
      prevProps,
    };
  }

  componentDidUpdate(prevState, prevProps) {
    console.log("componentDidUpdate");
    console.log("prevState", prevState);
    console.log("prevProps", prevProps);

    // this.setState({
    //     uState : prevState.uState
    // })
  }

  formSubmit = (evt) => {
    this.address.current.focus()
    let newAdd = this.address.current.value
    let newAge = this.age.current.value
    //alert(newAdd + newAge)

    this.setState({
      refAddress: newAdd,
      refAge: newAge
    })


    //default behavior of form is to submit. To stop use preventdefault
    evt.preventDefault()
  }

  //create and update the virtual DOM
  render() {
    console.log("call render");
    return (
      <div className="col-md-12">
        <h1>Home Component</h1>
        <h2>User age is {this.state.age}</h2>

        {/* controlled way of creating component - state directly coupled with changes */}
        <div className="form col-md-12">
          <div className="form-control">
            <div className="col-md-3">
              <b>Username</b>
            </div>
            <div className="col-md-7">
              <input
                type="text"
                className="form-control textbox username"
                placeholder="Please provide username"
                value={this.state.username}
                onChange={this.onTextChange}
              />
            </div>

            <div className="col-md-7">
              <input
                type="text"
                className="form-control textbox userAge"
                placeholder="Please provide username"
                value={this.state.age}
                onChange={this.onTextChange}
              />
            </div>

            <button
              className={"form-control btn btn-primary col-md-1"}
              onClick={this.updateName}
            >
              Update name to age
            </button>
          </div>
        </div>

        {/* uncontrolled component using reference element */}
        {/* <input type="text" ref={this.address}></input> */}

        <form className="form" action="/api/loginuser" method="post" onSubmit={this.formSubmit}>
          <b>Address</b>
          <input type="text" placeholder={"Default User Address"}
            ref={this.address} maxLength={20}>
          </input>
          <b>Age</b>
          <input
            type="number"
            placeholder={"Default User Age"}
            ref={this.age}
            maxLength={20}
          ></input>

          <button type="submit"> Save </button>
        </form>

        <label>{this.state.refAddress}</label>
        <hr />
        <label>{this.state.refAge}</label>
      </div>
    );
  }
}

// Home.defaultProps = {
//   parentName: "Ha Tran will be a Googler"
// }


//gives the warning if we set it to require
Home.propTypes = {
  parentName : PropTypes.string.isRequired
}