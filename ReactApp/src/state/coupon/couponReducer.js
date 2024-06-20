import * as actionTypes from "../actionTypes";

let initialState = {
  couponDiscount: {
    userId: "",
    discount: 0,
  },
};

let couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COUPON:
      return {
        ...state,
        couponDiscount: {
          userId: action.payload.userId,
          discount: parseInt(action.payload.coupon) < 500000 ? 10 : 20
        },
      };

    default:
      return state;
  }
};

export default couponReducer;
