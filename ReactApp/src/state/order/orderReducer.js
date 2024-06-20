import * as actionTypes from "../actionTypes";

let initialState = {
  orders: [],
};

let orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER_TO_STORE:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case actionTypes.UPDATE_ORDER_STATUS:
      let updatedOrders = state.orders.map((order) =>
        order._id == action.payload._id ? action.payload : order
      );
      return {
        ...state,
        orders: updatedOrders,
      };
    
    case actionTypes.CLEAR_ORDERS:
      return {
        ...state,
        orders: []
      }
       
    default:
      return state;
  }
};

export default orderReducer;
