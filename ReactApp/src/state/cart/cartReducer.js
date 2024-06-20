import * as actionTypes from "../actionTypes";

let initialState = {
  cart: {
    productList: []
  },
};

let cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const existingProductIndex = state.cart.productList.findIndex(
        (prod) => prod.product.productName === action.payload.productName
      );

      if (existingProductIndex !== -1) {
        const updatedProductList = state.cart.productList.map((prod, index) => {
          if (index === existingProductIndex) {
            return { ...prod, qty: prod.qty + 1 };
          } else {
            return prod;
          }
        });
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
              { product: action.payload, qty: 1 },
            ],
          },
        };
      }

    case actionTypes.UPDATE_ITEM:
      const updatedProductList = state.cart.productList.map((prod) => {
        if (prod.product._id == action.payload.id) {
          return {...prod, qty: action.payload.qty}
        }
        return prod;
      });

      return {
        ...state,
        cart: {
          productList: updatedProductList,
        },
      };

    case actionTypes.REMOVE_ITEM:
      const removedProductList = state.cart.productList.filter(p => p.product._id != action.payload);
      return {
        ...state,
        cart: {
          productList: removedProductList,
        },
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: {
          productList: [],
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
