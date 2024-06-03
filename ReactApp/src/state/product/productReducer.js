import * as actionTypes from "../actionTypes"

let initialState = {
  products : []
}

let productReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_PRODUCT_TO_STORE:
      return {...state, products: [...state.products, action.payload]};
    case actionTypes.GET_ALL_PRODUCTS:
      return {products : action.payload};
    default:
      return state
  }
}

export default productReducer;