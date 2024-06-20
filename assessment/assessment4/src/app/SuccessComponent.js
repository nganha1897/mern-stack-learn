import React, { Component } from "react";
import "./style.css";
import SuccessChild from "./component/SuccessChild";
import SuccessStory from "./component/SuccessStory";
import UserSignIn from "./component/UserSignIn";

export default class Success extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      name : "Ha Tran",
      address : "Pennsylvania",
      successStatus : ""
    }
  }

  updateSuccessStatus = (status) => {
    this.setState({
      successStatus : status
    })
  }
  
  onAddressChange = (evt) => {
    this.setState({
      address : evt.target.value
    })
    evt.preventDefault()
  }

  updateName = (evt) => {
    this.setState({
      name : this.state.address
    })
    evt.preventDefault()
  }

  componentDidMount() {
    this.setState({
      successStatus : "In Progress"
    })
  }

  componentWillUnmount() {
    console.log("Clean up!")
  }

  componentDidUpdate(prevState, prevProps) {
    console.log("Component updated")
    console.log("prevSate ", prevState)
    console.log("prevProps ", prevProps)
    return {
      prevState,
      prevProps
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps ", nextProps)
    console.log("nextState ", nextState)
    if (this.state.name === nextState.address) {
      return false
    }
    return true
  }

  render() {
    console.log("Render")
    return (
      <div>
        <h1>Ha Tran's Assessment</h1>
        <h1>Ha Tran's Success Status: {this.state.successStatus}</h1>

        <input type="text" placeholder="Change address" value={this.state.address} 
          onChange={this.onAddressChange}></input>
        <button onClick={this.updateName}>Update Address to Name</button>

        <SuccessChild 
          name={this.state.name} 
          address={this.state.address} 
          successStory={<SuccessStory updateStatus={this.updateSuccessStatus}/>}
        />

        <UserSignIn />
      </div>
    )
  }
}