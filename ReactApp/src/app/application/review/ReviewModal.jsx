import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB } from "../../../state/cart/cartAction";
import { Container, Col, Row, Table, Badge, Modal } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import CartItem from "../cart/CartItemComponent";
import CartSummary from "../cart/CartSummary";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SaveReviewToDB } from "../../../state/review/reviewAction";

let ReviewModal = (props) => {
  let order = props.order;
  let User = useSelector((store) => store.userReducer.user);
  let dispatch = useDispatch();

  const initialRatingArray = Array.from(
    { length: order == null ? 0 : order.order.productList.length },
    () => 0
  );
  const initialHoverArray = Array.from(
    { length: order == null ? 0 : order.order.productList.length },
    () => 0
  );
  const initialCommentArray = Array.from(
    { length: order == null ? 0 : order.order.productList.length },
    () => ''
  );
  //alert(order._id);
  const [rating, setRating] = useState(initialRatingArray);
  const [hover, setHover] = useState(initialHoverArray);
  const [comment, setComment] = useState(initialCommentArray);

  const handleChange = (index, event) => {
    const updatedComment = [...comment];
    updatedComment[index] = event.target.value;
    setComment(updatedComment);
  };

  let submit = () => {
    let reviews = []
    for (let i=0; i<rating.length; i++) {
      reviews.push({
        userId: User._id,
        productId: order.order.productList[i].product._id,
        orderId: order._id,
        rating: rating[i],
        comment: comment[i]
      })
    }
    dispatch(SaveReviewToDB(reviews));
    props.onHide();
    alert("Reviews successfully created!");
  };

  return (
    <>
      {order == null ? (
        <></>
      ) : (
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <strong>Write a Review</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            <Container>
              {order.order.productList.map((p, pIndex) => (
                <>
                  <Row
                    key={p.product._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <Col>
                      <Card.Img
                        variant="top"
                        src={p.product.image}
                        style={{ height: "50%", objectFit: "cover" }}
                      />
                    </Col>
                    <Col>
                      <Row>{p.product.productName}</Row>
                      <Row>${p.product.price}</Row>
                    </Col>
                    <Col>
                      <p>Your Rating</p>
                      {Array(5)
                        .fill(faStarRegular)
                        .map((icon, index) => {
                          const ratingValue = index + 1;
                          return (
                            <label key={index}>
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => {
                                  const updatedRating = [...rating];
                                  updatedRating[pIndex] = ratingValue;
                                  setRating(updatedRating);
                                }}
                                style={{ display: "none" }}
                              />
                              <FontAwesomeIcon
                                key={index}
                                icon={
                                  ratingValue <=
                                  (hover[pIndex] || rating[pIndex])
                                    ? faStarSolid
                                    : icon
                                }
                                color={
                                  ratingValue <=
                                  (hover[pIndex] || rating[pIndex])
                                    ? "gold"
                                    : "#e4e5e9"
                                }
                                size="lg"
                                onMouseEnter={() => {
                                  const updatedHover = [...hover];
                                  updatedHover[pIndex] = ratingValue;
                                  setHover(updatedHover);
                                }}
                                onMouseLeave={() => {
                                  const updatedHover = [...hover];
                                  updatedHover[pIndex] = 0;
                                  setHover(updatedHover);
                                }}
                              />
                            </label>
                          );
                        })}
                    </Col>
                  </Row>
                  <Row>
                    <textarea
                      rows={3}
                      value={comment[pIndex]}
                      onChange={(evt) => handleChange(pIndex, evt)}
                      placeholder="Enter your comment here..."
                    ></textarea>
                  </Row>
                  <hr></hr>
                </>
              ))}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => submit()}>Submit</Button>
            <Button variant = "danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ReviewModal;
