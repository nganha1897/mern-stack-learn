import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProductsFromDB,
  SaveProductToDB,
} from "../../../state/product/productAction";
import ProductHook from "./ProductListingComponent";

let ProductForm = (props) => {
  let productName = useRef(null);
  let productDescription = useRef(null);
  let price = useRef(0);
  let rating = useRef(0);
  let category = useRef(null);
  let image = useRef(null);

  const [showProductComponent, setShowProductComponent] = useState(false);
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
    } else if (classList.contains("productImage")) {
      image.current.value = value;
    }else {
      category.current.value = value;
    }
    evt.preventDefault();
  };

  let createProduct = (evt) => {
    let newProduct = {
      productName: productName.current.value,
      productDescription: productDescription.current.value,
      price: +price.current,
      rating: +rating.current,
      category: category.current.value,
      image: image.current.value
    };

    dispatch(SaveProductToDB(newProduct));
    setShowProductComponent(true);
    evt.preventDefault();
  };

  return (
    <>
    {showProductComponent && <ProductHook />}
    {!showProductComponent && (
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
            <div className="form">
              <b>Product Image</b>
              <input
                type="text"
                className="form-control productImage"
                ref={image}
                placeholder="Enter Product Image Path"
                onChange={onTextChange}
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
      </div>
      )}
    </>
  );
};

export default ProductForm;
