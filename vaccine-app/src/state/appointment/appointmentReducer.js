import * as actionTypes from "../actionTypes";

let initialState = {
  appointments: []
};

//action => type and payload

let appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_APPOINTMENT_TO_STORE:
      return {
        ...state,
        appointments: [action.payload, ...state.appointments]
      };

    case actionTypes.ADD_ALL_APPOINTMENTS:
      action.payload.sort((a,b) => {
          return b.date.split(" ")[2] == a.date.split(" ")[2] ?
          (b.time.split(" ")[1] == a.time.split(" ")[1] ? 
          b.time.split(" ")[0].split(":")[0] * 100 + b.time.split(" ")[0].split(":")[1] -  a.time.split(" ")[0].split(":")[0] * 100 - a.time.split(" ")[0].split(":")[1]
          : b.time.split(" ")[1].localeCompare(a.time.split(" ")[1])) : 
          parseInt(b.date.split(" ")[2]) - parseInt(a.date.split(" ")[2])
        })
      return { ...state, appointments : action.payload };
    
    case actionTypes.UPDATE_APPOINTMENT_STATUS:
      let updatedAppointments = state.appointments.map(appt => {
        if (appt._id == action.payload.appointmentId) {
          return {...appt, status: action.payload.status}
        }
        return appt;
      })
      return {...state, appointments: updatedAppointments};

    default:
      return state; //if no action type matched return default state
  }
};

export default appointmentReducer;
