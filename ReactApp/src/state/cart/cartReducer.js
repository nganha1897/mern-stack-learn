import * as actionTypes from "../actionTypes";

let initialState = {
  cart: {
    productList: [],
  },
};

let cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART_TO_STORE:
      return { ...state, cart: action.payload };
    case actionTypes.ADD_TO_CART:
      const existingProductIndex = state.cart.productList.findIndex(
        (prod) => prod.product.productName === action.payload.productName
      );

      if (existingProductIndex !== -1) {
        const updatedProductList = state.cart.productList.map(
          (prod, index) => {
            if (index === existingProductIndex) {
              return { ...prod, count: prod.count + 1 };
            } else {
              return prod;
            }
          }
        );
        return {
          ...state,
          cart: {
            productList: updatedProductList,
          },
        };
      } else {
        return {
          ...state,
          cart: {
            productList: [
              ...state.cart.productList,
              { product: action.payload, count: 1 },
            ],
          },
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
