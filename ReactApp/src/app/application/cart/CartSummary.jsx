import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB } from "../../../state/cart/cartAction";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";

let CartSummary = (props) => {
  let productList = useSelector((store) => store.cartReducer.cart.productList);
  let couponDiscount = useSelector((store) => store.couponReducer.couponDiscount);
  
  let productTotal = productList.reduce(
    (sum, product) => sum + product.product.price * product.qty,
    0
  );
  
  let total = productTotal + productTotal / 5 - productTotal / 100 * couponDiscount.discount;

  return (
    <>
      <h1>
        <strong>Summary</strong>
      </h1>
      <hr></hr>
      <Row>
        <Col className="text-start ms-5">Items</Col>
        <Col>{productList.length}</Col>
      </Row>
      <Row>
        <Col className="text-start ms-5">Products</Col>
        <Col>
          <strong>${productTotal}</strong>
        </Col>
      </Row>
      <Row>
        <Col className="text-start ms-5">Shipping</Col>
        <Col>10%</Col>
      </Row>
      <Row>
        <Col className="text-start ms-5">Tax</Col>
        <Col>10%</Col>
      </Row>
      <Row>
        <Col className="text-start ms-5">Discount</Col>
        <Col>{couponDiscount.discount}%</Col>
      </Row>
      <hr></hr>
      <Row>
        <Col className="text-start ms-5">
          <strong>Estimated Total</strong>
        </Col>
        <Col>
          <strong>${total}</strong>
        </Col>
      </Row>
      <br></br>
    </>
  );
};

export default CartSummary;
