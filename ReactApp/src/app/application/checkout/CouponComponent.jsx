import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB } from "../../../state/cart/cartAction";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { AddCoupon } from "../../../state/coupon/couponAction";

let Coupon = (props) => {
  let User = useSelector((store) => store.userReducer.user);
  let dispatchCoupon = useDispatch();

  let generateCoupon = () => {
    let coupon = "";
    for (let i=0; i<6; i++) {
      coupon = coupon + Math.floor(Math.random() * 10); 
    }
    alert("Coupon: " + coupon);
    dispatchCoupon(AddCoupon(coupon, User._id));
  }

  return (
    <>
      <Button variant="primary" onClick={() => generateCoupon()}>
        <span>Generate Coupon</span>
      </Button>
    </>
  );
};

export default Coupon;
