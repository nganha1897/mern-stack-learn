import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProductsFromDB,
  SaveProductToDB,
} from "../../../state/product/productAction";
import { SaveCartToDB } from "../../../state/cart/cartAction";

let CartHook = (props) => {
  let productList = useSelector((store) => store.cartReducer.cart.productList);
  let dispatchToDB = useDispatch();
  
  let saveToCheckout = (evt) => {
    dispatchToDB(SaveCartToDB({productList}))
    evt.preventDefault();
  };

  return (
    <>
      <div className={"componentClass"}>
        <h1>All Products In Cart</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Number of Items</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((prod, index) => (
              <tr key={prod.product.id}>
                <td>{prod.product.productName}</td>
                <td>{prod.product.productDescription}</td>
                <td>{prod.product.price}</td>
                <td>{prod.product.rating}</td>
                <td>{prod.product.category}</td>
                <td>{prod.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <input
          type="submit"
          className={"btn btn-primary"}
          value="Checkout"
          onClick={saveToCheckout}
        />
      </div>
    </>
  );
};

export default CartHook;
