import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  NavbarBrand,
  Form,
  Button,
  Container,
  Badge,
  DropdownButton, Dropdown, ListGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Notification from "./Notification";

const Header = (props) => {
  // Allows us to read data from store/reducer as we do with mapStateToProps
  const user = useSelector((store) => store.userReducer.user);
  const cartItemsCount = useSelector(
    (store) => store.cartReducer.cart.productList.length
  );
  const userName = user && user.userName ? user.userName : props.userName;

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        style={{ padding: "1rem 2rem", alignItems: "center" }}
      >
        <Container>
          <NavbarBrand href="/">SynerCart</NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home" className="active-link">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/product" className="active-link">
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="active-link">
                About
              </Nav.Link>
            </Nav>
            <Form className="d-flex me-auto" style={{ width: "50%" }}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="m-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>

            {/* {user._id == undefined || user._id == null ? (
              <></>
            ) : ( */}
            <Nav className="d-flex align-items-center">
              <Nav.Link as={NavLink} to="/recentOrders" className="active-link">
                Orders
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/cart"
                className="d-flex align-items-center active-link"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ fontSize: "1.5em" }}
                />
                <span className="ms-2">Cart</span>
              </Nav.Link>
              <Notification></Notification>
            </Nav>
            {/* )} */}
            <Nav className="d-flex align-items-center">
              <Nav.Link
                as={NavLink}
                to="/user"
                className="d-flex align-items-center ms-3 active-link"
              >
                <p className="mb-0">Welcome, {userName}</p>
                <FontAwesomeIcon icon={faUser} className="ms-2" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
