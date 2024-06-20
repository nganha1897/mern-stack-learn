import * as actionTypes from "../actionTypes";

let initialState = {
  reviews: [],
  productReviews: []
};

let reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, ...action.payload],
      };
    
    case actionTypes.ADD_PRODUCT_REVIEW:
      return {
        ...state,
        productReviews: [...state.productReviews, action.payload],
      };

    case actionTypes.CLEAR_REVIEWS:
      return {
        ...state,
        productReviews: [],
      };

    default:
      return state;
  }
};

export default reviewReducer;
