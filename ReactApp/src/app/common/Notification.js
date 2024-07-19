import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  NavbarBrand,
  Form,
  Button,
  Container,
  Badge,
  DropdownButton,
  Dropdown,
  ListGroup,
} from "react-bootstrap";
import {
  faUser,
  faShoppingCart,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let Notification = (props) => {
   
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message:
        "You can add products from the product screen to cart before checkout!",
      type: "static",
    },
    {
      id: 2,
      message: "You can update items from the cart page!",
      type: "static",
    },
    {
      id: 3,
      message: "You can review cart from the checkout page!",
      type: "static",
    },
    {
      id: 4,
      message: "You can make payment from the payment page!",
      type: "static",
    },
    {
      id: 5,
      message: "You can cancel an order within 2 days or reorder!",
      type: "static",
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [nextId, setNextId] = useState(6);

  let orderCancel = useSelector((store) => store.orderReducer.cancel);
  
  const cartItemsCount = useSelector(
    (store) => store.cartReducer.cart.productList.length
  );

  const [prevCartItemsCount, setPrevCartItemsCount] = useState(cartItemsCount);
  const [prevOrderCancel, setPrevOrderCancel] = useState(orderCancel);

  useEffect(() => {
    if (prevCartItemsCount != cartItemsCount && cartItemsCount != 0) {
      let noti = {
        id: nextId,
        message: "You have " + cartItemsCount + " items in cart!",
        type: "dynamic",
      };
      let updatedNotifications = [...notifications];
      updatedNotifications.unshift(noti);
      setNotifications(updatedNotifications);
      setUnreadCount(unreadCount + 1);
      setNextId(nextId + 1);
      setIconClicked(true);
    }

    if (
      prevOrderCancel < orderCancel
    ) {
      let noti2 = {
        id: nextId,
        message: "Your order has been cancelled!",
        type: "dynamic",
      };
      let updatedNotifications = [...notifications];
      updatedNotifications.unshift(noti2);
      setNotifications(updatedNotifications);
      setUnreadCount(unreadCount + 1);
      setNextId(nextId + 1);
      setIconClicked(true);
    }
    setPrevCartItemsCount(cartItemsCount);
    setPrevOrderCancel(orderCancel);
    
  }, [cartItemsCount, orderCancel]);

  const [iconClicked, setIconClicked] = useState(false);

  let handleNotificationClick = (id) => {
    let updatedNotifications = [...notifications];
    updatedNotifications = updatedNotifications.filter((n) => n.id != id);
    setNotifications(updatedNotifications);
    setUnreadCount(unreadCount - 1);
  };

  return (
    <div className="notificationContainer">
      {/* <Button  className="ms-1 badge bg-danger rounded-circle"> */}
      <FontAwesomeIcon
        icon={faBell}
        size="xl"
        color="#6c757d"
        onClick={() => setIconClicked(!iconClicked)}
      />
      {unreadCount > 0 && (
        <Badge pill bg="danger" className="badge2">
          {unreadCount}
        </Badge>
      )}
      {iconClicked && (
        <ListGroup className="notificationDropdown">
          {notifications.map((notification) => (
            <ListGroup.Item
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              variant={notification.type == "static" ? "light" : "primary"}
            >
              {notification.message}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Notification;
