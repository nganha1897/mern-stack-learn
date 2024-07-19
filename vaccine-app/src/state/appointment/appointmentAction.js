//action - is an object with 2 properties - type and payload
import * as actionTypes from "../actionTypes";
import axios from "axios";

export const addAllAppointmentsToStore = (appointments) => {
  return {
    type: actionTypes.ADD_ALL_APPOINTMENTS,
    payload: appointments,
  };
};

export const addAppointmentToStore = (appointment) => {
  return {
    type: actionTypes.ADD_APPOINTMENT_TO_STORE,
    payload: appointment,
  };
};

export const getAllAppointments = (user) => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/appointment/api/appointments", {
        params: {
          user,
        },
      })
      .then((collection) => {
        let appointments = collection.data;
        dispatch(addAllAppointmentsToStore(appointments));
      })
      .catch((err) => {
        console.log("Error while fetching appointments", err);
      });
  };
};

export const getAppointmentById = (id) => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/appointment/api/appointments", {
        params: {
          id,
        },
      })
      .then((collection) => {
        let appointments = collection.data;
        //dispatch(addAllAppointmentsToStore(appointments));
      })
      .catch((err) => {
        console.log("Error while fetching appointment", err);
      });
  };
};

export const createAppointment = (newAppointment, newRegistration) => {
  //  return (dispatch) => {
  //   axios
  //     .post(
  //       "http://localhost:9000/registration/api/create", //uri or endpoint of signinup api
  //       newRegistration,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((collection) => {
  //       let registration = collection.data;
  //       newAppointment.registration = registration.registrationId;
  //       axios
  //         .post(
  //           "http://localhost:9000/appointment/api/create", //uri or endpoint of signinup api
  //           newAppointment //the user state object we dispatch from user component
  //         )
  //         .then((collection) => {
  //           let appointment = collection.data;
  //           console.log("appointment: " + appointment);
  //           dispatch(addAppointmentToStore(appointment));
  //           return appointment._id;
  //         })
  //         .catch((err) => {
  //           console.log("Error while creating appointment!", err);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log("Error while creating registration!", err);
  //     });
  // };
  return async (dispatch) => {
    try {
      // First create registration
      const registrationResponse = await axios.post(
        "http://localhost:9000/registration/api/create",
        newRegistration,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const registration = registrationResponse.data;
      
      // Update newAppointment with registrationId
      newAppointment.registration = registration.registrationId;

      // Then create appointment
      const appointmentResponse = await axios.post(
        "http://localhost:9000/appointment/api/create",
        newAppointment
      );
      const appointment = appointmentResponse.data;
      
      // Dispatch action to add appointment to store
      dispatch(addAppointmentToStore(appointment));

      // Return the appointment ID
      return appointment._id;
    } catch (error) {
      console.error("Error while creating appointment:", error);
      throw error; // Propagate the error for handling in UI or other components
    }
  };
};

export const updateAppointmentStatus = (appointmentId, status) => {
  return (dispatch) => {
    axios
      .post(
        "http://localhost:9000/appointment/api/updateStatus", //uri or endpoint of signinup api
        { appointmentId, status }
      )
      .then((collection) => {
        let appointment = collection.data;
        console.log("appointment: " + appointment);
        dispatch(updateAppointmentToStore(appointmentId, status));
      })
      .catch((err) => {
        console.log("Error while updating appointment!", err);
      });
  };
};

export const updateAppointmentToStore = (appointmentId, status) => {
  return {
    type: actionTypes.UPDATE_APPOINTMENT_STATUS,
    payload: { appointmentId, status },
  };
};
