//action - is an object with 2 properties - type and payload
import * as actionTypes from "../actionTypes";
import axios from "axios";

export const addVaccineToStore = (vaccine) => {
  return {
    type: actionTypes.ADD_VACCINE_TO_STORE, 
    payload: vaccine, 
  };
};

export const createVaccine = (newVaccine) => {
  return (dispatch) => {
    axios
      .post(
        "http://localhost:9000/vaccine/api/create", //uri or endpoint of signinup api
        newVaccine //the user state object we dispatch from user component
      )
      .then((collection) => {
        let vaccine = collection.data;
        console.log("vaccine: " + vaccine);
        dispatch(addVaccineToStore(vaccine));
      })
      .catch((err) => {
        console.log("Error while creating vaccine!", err);
      });
  };
};

export const addAllVaccinesToStore = (vaccines) => {
  return {
    type: actionTypes.ADD_ALL_VACCINES,
    payload: vaccines
  }
}

export const getAllVaccines = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/vaccine/api/vaccines")
      .then((collection) => {
        let vaccines = collection.data;
        dispatch(addAllVaccinesToStore(vaccines));
      })
      .catch((err) => {
        console.log("Error while fetching vaccines", err);
      });
  };
};
