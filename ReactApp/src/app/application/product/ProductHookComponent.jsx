import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProductsFromDB,
  SaveProductToDB,
} from "../../../state/product/productAction";
import { AddProductToCart } from "../../../state/cart/cartAction";

let ProductHook = (props) => {
  let products = useSelector((store) => store.productReducer.products);

  let productName = useRef(null);
  let productDescription = useRef(null);
  let price = useRef(0);
  let rating = useRef(0);
  let category = useRef(null);

  let numProducts = useRef([]);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProductsFromDB());
  }, [dispatch]);

  let onTextChange = (evt) => {
    let target = evt.target;
    let classList = target.classList;
    let value = target.value;

    if (classList.contains("productName")) {
      productName.current.value = value;
    } else if (classList.contains("productDescription")) {
      productDescription.current.value = value;
    } else if (classList.contains("productPrice")) {
      price.current = value;
    } else if (classList.contains("productRating")) {
      rating.current = value;
    } else {
      category.current.value = value;
    }
    evt.preventDefault();
  };

  let onNumProductChange = (index, evt) => {
    numProducts.current[index] = evt.target.value;
    evt.preventDefault();
  };

  let createProduct = (evt) => {
    let newProduct = {
      productName: productName.current.value,
      productDescription: productDescription.current.value,
      price: +price.current,
      rating: +rating.current,
      category: category.current.value,
    };

    dispatch(SaveProductToDB(newProduct));
    evt.preventDefault();
  };

  let addToCart = (product, index) => {
    if (numProducts.current[index] == undefined)
      dispatch(AddProductToCart(product));
    else {
      for (let i = 1; i <= numProducts.current[index]; i++) {
        dispatch(AddProductToCart(product));
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-4">
          <h1>Product Details</h1>
          <section className={"componentClass"}>
            <div className="form">
              <b>Product Name</b>
              <input
                type="text"
                className="form-control productName"
                ref={productName}
                placeholder="Enter Product Name"
                onChange={onTextChange}
                maxLength={40}
              />
            </div>
            <br></br>
            <div className="form">
              <b>Product Description</b>
              <input
                type="text"
                className="form-control productDescription"
                ref={productDescription}
                placeholder="Enter Product Description"
                onChange={onTextChange}
                maxLength={100}
              />
            </div>
            <br></br>
            <div className="form">
              <b>Product Price</b>
              <input
                type="number"
                className="form-control productPrice"
                ref={price}
                placeholder="Enter Product Price"
                onChange={onTextChange}
              />
            </div>
            <br></br>
            <div className="form">
              <b>Product Rating</b>
              <input
                type="number"
                className="form-control productRating"
                ref={rating}
                placeholder="Enter Product Rating"
                onChange={onTextChange}
              />
            </div>
            <br></br>
            <div className="form">
              <b>Product Category</b>
              <input
                type="text"
                className="form-control productCategory"
                ref={category}
                placeholder="Enter Product Category"
                onChange={onTextChange}
                maxLength={40}
              />
            </div>
            <br></br>
            <input
              type="submit"
              className={"btn btn-primary"}
              value="Submit Product"
              onClick={createProduct}
            />
          </section>
        </div>
        <div className="col-8">
          <h1>All Products</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Category</th>
                <th>Add To Cart</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.category}</td>
                  <td>
                    <input
                      type="number"
                      className={"col-3 numProducts"}
                      ref={numProducts[index]}
                      defaultValue={1}
                      onChange={(evt) => onNumProductChange(index, evt)}
                    />
                    <input
                      type="submit"
                      className={"btn btn-primary"}
                      value="Add"
                      onClick={() => addToCart(product, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductHook;
