import React, { Component } from "react";

export default class StudentComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            studentName : props.student.studentName, // we need to read from store using props through container
            age : props.student.age,
            address : props.student.address
        }
    }

    onTextChange = (evt)=>{
        let target = evt.target;
        let classList = target.classList;//reading the class name of html when change event happens
        let value = target.value;
    
        if(classList.contains("studentname")){
            this.setState({ studentName : value })
        }else if (classList.contains("age")) {
            this.setState({ age : value })
        } else {
            this.setState({ address : value })
        }    

        evt.preventDefault();
    }

    loginStudent = (evt)=>{        
        let newStudent = this.state;
        this.props.loginStudent(newStudent) 
        evt.preventDefault();
    }
 
    render(){
        return(
            <>
                <h1>Student Login Page</h1>
                <section className={"componentClass"}>
                    <div className="form col-md-8">
                        <div className="col-md-12">
                            <b>Student Name</b>
                            <input type="text" className="form-control col-md-6 studentname" 
                                    value={this.state.studentName} 
                                placeholder="Student Name" onChange={this.onTextChange} maxLength={40}/>
            
                            </div>
                        
                            <div className="col-md-12">
                                <b>Age</b>
                                <input type="number" className="form-control col-md-6 mobile" value={this.state.age} 
                                placeholder="age" maxLength="3"
                                onChange={this.onTextChange} />
                            </div>

                            <input type="button" className={"btn btn-primary col-md-2 saveStudent"} 
                                    value={"SignIn-Up"} 
                                    onClick={this.loginStudent}/>
                                    
                        </div>
                </section>
            </>
        )
    }
}