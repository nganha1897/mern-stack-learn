import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, SaveCartToDB } from "../../../state/cart/cartAction";
import { Container, Col, Row, Table, Badge } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import CartItem from "../cart/CartItemComponent";
import CartSummary from "../cart/CartSummary";
import {
  EmptyOrders,
  GetAllOrdersFromDB,
  SaveOrderToDB,
  UpdateOrderToDB,
} from "../../../state/order/orderAction";
import { AddProductToCart } from "../../../state/cart/cartAction";
import ReviewModal from "../review/ReviewModal";

let RecentOrder = (props) => {
  let recentOrders = useSelector((store) => store.orderReducer.orders);
  let User = useSelector((store) => store.userReducer.user);

  const [modalShow, setModalShow] = useState(false);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(EmptyOrders());
    dispatch(GetAllOrdersFromDB(User._id));
  }, [dispatch]);

  let today = new Date();

  recentOrders.map((o) => {
    if (
      o.status == "Processing" &&
      today >= new Date(o.order.estimatedDeliveryDate)
    ) {
      dispatch(UpdateOrderToDB(o._id, "Delivered"));
    }
  });

  let cancel = (id, status) => {
    dispatch(UpdateOrderToDB(id, status));
  };

  let reorder = (order) => {
    order.order.productList.map((p) => {
      for (let i = 1; i <= p.qty; i++) {
        dispatch(AddProductToCart(p.product));
      }
    });
  };
  
  const [reviewedOrder, setReviewedOrder] = useState(null);

  let review = (order) => {
    setReviewedOrder(order);
    setModalShow(true);
    
  };

  return (
    <Container className="text-center">
      <Row>
        <h1>
          <strong>Recent Orders</strong>
        </h1>
      </Row>
      {recentOrders.length == 0 ? (
        <></>
      ) : (
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th className="bg-light" hidden>
                Order Id
              </th>
              <th className="bg-light text-center">Order Date</th>
              <th className="bg-light text-center">Items</th>
              <th className="bg-light text-center">Total</th>
              <th className="bg-light text-center">Status</th>
              <th className="bg-light text-center" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <>
                <tr>
                  <td hidden>{o._id}</td>
                  <td>
                    <h6>{new Date(o.createdDate).toDateString()}</h6>
                  </td>
                  <td>
                    <h6>{o.order.productList.length}</h6>
                  </td>
                  <td>
                    <h6>${o.order.total}</h6>
                  </td>
                  <td>
                    <h5>
                      {o.status == "Cancelled" ? (
                        <Badge pill bg="danger">
                          {o.status}
                        </Badge>
                      ) : o.status == "Delivered" ? (
                        <Badge pill bg="success">
                          {o.status}
                        </Badge>
                      ) : (
                        <Badge pill bg="warning" text="dark">
                          {o.status}
                        </Badge>
                      )}
                    </h5>
                  </td>
                  <td>
                    {o.status == "Processing" ? (
                      <Button
                        variant="danger"
                        onClick={() => cancel(o._id, "Cancelled")}
                      >
                        <span>Cancel</span>
                      </Button>
                    ) : o.status == "Delivered" ? (
                      <Button variant="info" onClick={() => review(o)}>
                        <span>Review</span>
                      </Button>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => reorder(o)}>
                      <span>Reorder</span>
                    </Button>
                  </td>
                </tr>
                <ReviewModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  order={reviewedOrder}
                />
              </>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RecentOrder;
