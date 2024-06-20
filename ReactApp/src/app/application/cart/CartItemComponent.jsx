import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB, UpdateItem, removeItem } from "../../../state/cart/cartAction";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";

let CartItem = (props) => {
  let item = props.item;
  let [quantity, setQuantity] = useState(item.qty);

  let dispatchItem = useDispatch();

  let updateQty = (id, offset) => {
    if (quantity > 1 || offset > 0) {
      setQuantity(quantity + offset);
      dispatchItem(UpdateItem(id, quantity + offset));
    }
  };

  let updateInputQty = (id, evt) => {
    if (evt.target.value > 0) {
        setQuantity(evt.target.value)};
        dispatchItem(UpdateItem(id, evt.target.value));
    evt.preventDefault();
  }

  return (
    <>
      <Row
        key={item.product._id}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <hr></hr>
        <Col>
          <Card.Img
            variant="top"
            src={item.product.image}
            style={{ height: "50%", objectFit: "cover" }}
          />
        </Col>
        <Col>
          <Row>{item.product.productName}</Row>
          <Row>{item.product.productDescription}</Row>
        </Col>
        <Col>
          <Button variant="primary" onClick={() => updateQty(item.product._id, -1)}>
            <span>-</span>
          </Button>
          <input
            type="number"
            min="1"
            value={quantity}
            style={{ width: "40%" }}
            onChange={(evt)=>updateInputQty(item.product._id, evt)}
          />

          <Button variant="primary" onClick={() => updateQty(item.product._id, 1)}>
            <span>+</span>
          </Button>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">${item.product.price * quantity}</Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Button variant="primary" onClick={() => dispatchItem(removeItem(item.product._id))}>
            <span>x</span>
          </Button>
        </Col>
      </Row>
      <br></br>
    </>
  );
};

export default CartItem;
