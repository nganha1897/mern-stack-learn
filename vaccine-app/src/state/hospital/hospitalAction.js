//action - is an object with 2 properties - type and payload
import * as actionTypes from "../actionTypes";
import axios from "axios";

export const addAllHospitalsToStore = (hospitals) => {
  return {
    type: actionTypes.ADD_ALL_HOSPITALS,
    payload: hospitals,
  };
};

export const getAllHospitals = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/hospital/api/hospitals")
      .then((collection) => {
        let hospitals = collection.data;
        dispatch(addAllHospitalsToStore(hospitals));
      })
      .catch((err) => {
        console.log("Error while fetching hospitals", err);
      });
  };
};
