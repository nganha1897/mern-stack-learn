import React from "react";
import { useSelector } from "react-redux";
// import { Navbar, Nav, NavbarBrand, Container } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { NavLink } from "react-router-dom";

const Header = (props) => {
  // const cartItemsCount = useSelector(
  //   (store) => store.cartReducer.cart.productList.length
  // );
  // const userName = user && user.userName ? user.userName : props.userName;
  const username = props.username;

  return (
    <>
      {/* <Navbar
        bg="light"
        variant="light"
        style={{ padding: "1rem 2rem", alignItems: "center" }}
      >
        <Container>
          <NavbarBrand href="/">SynerVaccine</NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="d-flex align-items-center">
              <Nav.Link
                as={NavLink}
                to="/user"
                className="d-flex align-items-center ms-3 active-link"
              >
                <p className="mb-0">Welcome, {username}</p>
                <FontAwesomeIcon icon={faUser} className="ms-2" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};

export default Header;
