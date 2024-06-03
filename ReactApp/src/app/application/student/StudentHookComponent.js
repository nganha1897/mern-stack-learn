import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SaveStudentToDB } from "../../../state/student/studentAction";

let StudentHook = (props)=>{

    

  let Student = useSelector((store)=>store.studentReducer.student) //reads defined data in reducer 

  // initializes state and returns a callback which we can use to update the state
  let [studentName, setStudentName] = useState(Student.studentName) 
  let [age, setAge] = useState(Student.age)
  let [address, setAddress] = useState(Student.address)

  let onTextChange = (evt)=>{
      let val = evt.target.value
      setStudentName(val)
      evt.preventDefault()
  }

  //this makes the component as publisher for the data back to store => dispatches 
  let dispatchToDB = useDispatch()

  let loginStudent = (evt)=>{
      let newStudent = {
          studentName,
          age,
          address,
      }
      dispatchToDB(SaveStudentToDB(newStudent))
      alert("Student saved");
      evt.preventDefault();
  }

  return(
      <>
          <h1>Student Login Page</h1>
          <section className={"componentClass"}>
              <div className="form col-md-8">
                  <div className="col-md-12">
                      <b>Student Name</b>
                      <input type="text" className="form-control col-md-6 studentName" 
                              value={studentName}
                          placeholder="Student Name" onChange={onTextChange} maxLength={40}/>
                  </div>
                  <div className="col-md-12">
                      <b>Age</b>
                      <input type="number" className="form-control col-md-6 mobile" 
                          value={age} placeholder="Age" maxLength={11}
                          onChange={(evt)=>setAge(evt.target.value)} />
                  </div>
                  <div className="col-md-12">
                          <b>Address</b>
                              <input type="text" className="form-control col-md-6 street" 
                              value={address} 
                          placeholder="Address" onChange={(evt)=>setAddress(evt.target.value)} />
                  </div>
                      
                  
                  <input type="button" className={"btn btn-primary col-md-2 saveStudent"} 
                                  value={"SignIn-Up"} 
                                  onClick={loginStudent}/>
              </div>
          </section>

      </>
  )
}

export default StudentHook;