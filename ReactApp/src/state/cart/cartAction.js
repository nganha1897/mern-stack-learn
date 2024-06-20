import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddCartToStore = (cart) => {
  return {
    type : actionTypes.ADD_CART_TO_STORE, 
    payload : cart 
  }
}

export const SaveCartToDB = (newCart) => {
  return (dispatch) => {
    axios.post("http://localhost:9000/cart/api/createCartCheckout",  
      newCart
    ).then((collection) => {
      let cart = collection.data
      console.log(cart);
    }).catch((err) => {
      console.log("error while creating cart", err)
    })
  }
}

export const AddProductToCart = (product) => {
  return {
    type : actionTypes.ADD_TO_CART,
    payload : product
  }
}

export const UpdateItem = (id, qty) => {
  return {
    type : actionTypes.UPDATE_ITEM,
    payload : {
      id,
      qty
    }
  }
}

export const removeItem = (id) => {
  return {
    type : actionTypes.REMOVE_ITEM,
    payload : id
  }
}

export const ClearCart = () => {
  return {
    type : actionTypes.CLEAR_CART
  }
}