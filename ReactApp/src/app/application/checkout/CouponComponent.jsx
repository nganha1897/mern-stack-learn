import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB } from "../../../state/cart/cartAction";
import { Container, Col, Row, Badge } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { AddCoupon } from "../../../state/coupon/couponAction";

let Coupon = (props) => {
  let User = useSelector((store) => store.userReducer.user);
  let dispatchCoupon = useDispatch();

  let [coupon, setCoupon] = useState("");

  let generateCoupon = () => {
    let newCoupon = "";
    for (let i = 0; i < 6; i++) {
      newCoupon += Math.floor(Math.random() * 10);
    }
    setCoupon(newCoupon);
    dispatchCoupon(AddCoupon(newCoupon, User._id));
  };

  return (
    <>
      <Button variant="danger" onClick={() => generateCoupon()}>
        <span>Generate Coupon</span>
      </Button>
      <div><h3>{coupon != "" && <Badge bg="success">Coupon: {coupon}</Badge>}</h3></div>
    </>
  );
};

export default Coupon;
