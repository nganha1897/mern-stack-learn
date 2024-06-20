import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductsFromDB } from "../../../state/product/productAction";
import { AddProductToCart } from "../../../state/cart/cartAction";
import ProductForm from "./ProductFormComponent";
import { Button, Card, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import ProductReviewModal from "./ProductReviewModal";
import {GetAllReviewsFromDB} from "../../../state/review/reviewAction";

let ProductHook = (props) => {
  let products = useSelector((store) => store.productReducer.products);
  let User = useSelector((store) => store.userReducer.user);

  let numProducts = useRef([]);

  const [currentRating, setCurrentRating] = useState(1);
  const [showProductFormComponent, setShowProductFormComponent] =
    useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [reviews, setReviews] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProductsFromDB());
  }, [dispatch]);

  let onNumProductChange = (index, evt) => {
    numProducts.current[index] = evt.target.value;
    evt.preventDefault();
  };

  let addToCart = (product, index) => {
    if (User.userName == null) {
      alert("Please log in to add product to cart!");
    } else {
      if (numProducts.current[index] == undefined)
        dispatch(AddProductToCart(product));
      else {
        for (let i = 1; i <= numProducts.current[index]; i++) {
          dispatch(AddProductToCart(product));
        }
      }
      //alert("Product added to cart!");
    }
  };

  let handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
  };

  let showReview = (id) => {
    let productReviews = dispatch(GetAllReviewsFromDB(id));
    setModalShow(true);
  };

  return (
    <>
      {showProductFormComponent && <ProductForm />}
      {!showProductFormComponent && (
        <div>
          <div>
            <div class="product-cards-container">
              {products.map((product, index) => (
                <>
                  <div>
                    <Card
                      style={{
                        width: "15rem",
                        height: "30rem",
                        margin: "5px",
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{ height: "50%", objectFit: "cover" }}
                      />
                      <Card.Body className="text-center bg-light">
                        <Card.Title style={{ fontWeight: "bold" }}>
                          {product.productName}
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                          {product.category}
                        </Card.Subtitle>
                        <Card.Text>${product.price}</Card.Text>
                        <div>
                          {Array(product.rating)
                            .fill(faStar)
                            .map((icon, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={icon}
                                style={{ color: "gold" }}
                              />
                            ))}
                        </div>
                        <Card.Link onClick={() => showReview(product._id)}>
                          Reviews
                        </Card.Link>
                        <ProductReviewModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            type="number"
                            min="1"
                            defaultValue={1}
                            ref={numProducts[index]}
                            style={{ width: "30%", marginRight: "5px" }}
                            onChange={(evt) => onNumProductChange(index, evt)}
                          />

                          <Button
                            variant="primary"
                            onClick={() => addToCart(product, index)}
                          >
                            <span>Add </span>
                            <FontAwesomeIcon icon={faShoppingCart} />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              ))}
              <Card
                style={{
                  width: "15rem",
                  height: "30rem",
                  margin: "5px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card.Img
                  variant="top"
                  src={
                    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                  }
                  style={{ height: "50%", objectFit: "cover" }}
                />
                <Card.Body
                  className="text-center bg-light"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="bg-light"
                    className="rounded-circle border"
                    onClick={() => setShowProductFormComponent(true)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ fontSize: "6em", color: "grey", border: "" }}
                    />
                  </Button>
                </Card.Body>
              </Card>
            </div>

            <Pagination
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductHook;
