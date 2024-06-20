import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB } from "../../../state/cart/cartAction";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import CartItem from "./CartItemComponent";
import CartSummary from "./CartSummary";

let CartHook = (props) => {
  let productList = useSelector((store) => store.cartReducer.cart.productList);

  let User = useSelector((store) => store.userReducer.user);

  let dispatchToDB = useDispatch();

  let navigate = useNavigate();

  let productTotal = productList.reduce(
    (sum, product) => sum + product.product.price * product.qty,
    0
  );
  let total = productTotal + productTotal / 5;
  
  let saveToCheckout = () => {
    dispatchToDB(
      SaveCartToDB({
        productList: productList,
        totalPrice: total,
        userId: User._id,
      })
    );
    navigate('/checkout');
    alert("Cart successfully saved!");
  };

  return (
    <Container className="text-center">
      <Row>
        <Col sm={8}>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <Col className="text-start">
              <h1>
                <strong>Shopping Cart</strong>
              </h1>
            </Col>
            <Col className="text-end me-4">{productList.length} items</Col>
          </Row>
          <Row>
            {productList.map((prod, index) => (
              <CartItem item={prod}></CartItem>
            ))}
          </Row>
        </Col>
        <Col sm={4} className="container-fluid vh-100 bg-light text-center">
          <CartSummary></CartSummary>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => saveToCheckout()}>
                <span>Checkout</span>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CartHook;


