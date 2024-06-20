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

let ProductReviewModal = (props) => {
  let reviews = useSelector((store) => store.reviewReducer.productReviews);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <strong>All Reviews</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          {reviews.map((r, pIndex) => (
            <>
              <Row
                key={r._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}
              >
                <Row>
                  <Col>Rating:</Col>
                  <Col>
                    {Array(5)
                      .fill(faStarRegular)
                      .map((icon, index) => {
                        const ratingValue = index + 1;
                        return (
                          <FontAwesomeIcon
                            key={index}
                            icon={ratingValue <= r.rating ? faStarSolid : icon}
                            style={{ color: "gold" }}
                          />
                        );
                      })}
                  </Col>
                </Row>
                <Row>
                  <Col>Comment:</Col>
                  <Col>{r.comment}</Col>
                </Row>
              </Row>

              <hr></hr>
            </>
          ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductReviewModal;
