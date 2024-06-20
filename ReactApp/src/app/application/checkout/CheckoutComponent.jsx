import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB } from "../../../state/cart/cartAction";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import CartItem from "../cart/CartItemComponent";
import CartSummary from "../cart/CartSummary";
import Coupon from "./CouponComponent";
import { SaveOrderToDB } from "../../../state/order/orderAction";
let Checkout = () => {
  let productList = useSelector((store) => store.cartReducer.cart.productList);

  let couponDiscount = useSelector(
    (store) => store.couponReducer.couponDiscount
  );

  let User = useSelector((store) => store.userReducer.user);

  let dispatchToDB = useDispatch();

  let navigate = useNavigate();

  let [payment, setPayment] = useState(false);

  let productTotal = productList.reduce(
    (sum, product) => sum + product.product.price * product.qty,
    0
  );

  let total =
    productTotal +
    productTotal / 5 -
    (productTotal / 100) * couponDiscount.discount;

  let deliveryDate = new Date();
  deliveryDate.setDate(new Date().getDate() + 2);

  let pay = () => {
    dispatchToDB(
      SaveOrderToDB({
        userId: User._id,
        order: {
          name: User.userName,
          address: User.street,
          estimatedDeliveryDate: deliveryDate,
          productList,
          total,
        },
        createdDate: new Date(),
        status: "Processing"
      })
    );
    dispatchToDB(ClearCart());
    setPayment(true);
    {setTimeout(() => {
      navigateOrders();
    }, 2000)}
  };

  let navigateOrders = () => {
    navigate("/recentOrders");
  };

  return (
    <>
      {payment ? (
        <h1 className="text-center">
          Thank you for your payment! Your order is being processed!
        </h1>
      ) : (
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
                    <strong>Checkout</strong>
                  </h1>
                </Col>
              </Row>
              <hr></hr>
              <Row className="text-start">
                <h4>
                  <strong>Shipping Address</strong>
                </h4>
                <p>Name: {User.userName}</p>
                <p>Address: {User.street}</p>
                <p>Estimated Delivery Date: {deliveryDate.toDateString()}</p>
              </Row>
              <hr></hr>
              <Row>
                <h4 className="text-start">
                  <strong>Cart Items</strong>
                </h4>
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
                  <Button variant="primary" onClick={() => pay()}>
                    <span>Pay</span>
                  </Button>

                  <Coupon></Coupon>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Checkout;
