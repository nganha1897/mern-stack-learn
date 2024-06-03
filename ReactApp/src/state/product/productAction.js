import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddProductToStore = (product) => {
  return {
    type : actionTypes.ADD_PRODUCT_TO_STORE,
    payload : product
  }
}

export const GetAllProductsFromStore = (products) => {
  return {
    type : actionTypes.GET_ALL_PRODUCTS,
    payload : products
  }
}

export const SaveProductToDB = (newProduct) => {
  return (dispatch) => {
    axios.post("http://localhost:9000/product/api/createProduct",
      newProduct
    ).then((collection) => {
      let product = collection.data
      console.log(product)
      dispatch(AddProductToStore(product))
    }).catch((err) => {
      console.log("error while creating product", err)
    })
  }
}

export const GetAllProductsFromDB = () => {
  return (dispatch) => {
    axios.get("http://localhost:9000/product/api/products"
    ).then((collection) => {
      let products = collection.data
      console.log(products)
      dispatch(GetAllProductsFromStore(products))
    }).catch((err) => {
      console.log("error while fetching products", err)
    })
  }
}