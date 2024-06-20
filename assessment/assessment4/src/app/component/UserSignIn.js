import React, { Component } from "react";

export default class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "default",
      password : "default"
    }

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  submitForm = (evt) => {
    
    this.setState({
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value
    })

    evt.preventDefault()
  }

  render() {
    return (
      <div>
        <form
          className="form"
          action="/api/signin"
          method="post"
          onSubmit={this.submitForm}
        >
          <input
            type="text"
            placeholder={"Enter username"}
            ref={this.usernameRef}
            maxLength={20}
          ></input>

          <input
            type="text"
            placeholder={"Enter password"}
            ref={this.passwordRef}
            maxLength={20}
          ></input>

          <button type="submit">Submit</button>
        </form>

        <label>User signin username: {this.state.username}</label>
        <br/>
        <label>User signin password: {this.state.password}</label>
      </div>
    );
  }
}
