import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddOrderToStore = (order) => {
  return {
    type: actionTypes.ADD_ORDER_TO_STORE,
    payload: order,
  };
};

export const UpdateOrderInStore = (order) => {
  return {
    type: actionTypes.UPDATE_ORDER_STATUS,
    payload: order,
  };
};

export const EmptyOrders = () => {
  return {
    type: actionTypes.CLEAR_ORDERS
  }
}

export const SaveOrderToDB = (newOrder) => {
  return (dispatch) => {
    axios
      .post("http://localhost:9000/order/api/createOrder", newOrder)
      .then((collection) => {
        let order = collection.data;
        //dispatch(AddOrderToStore(order))
        console.log(order);
      })
      .catch((err) => {
        console.log("error while creating order", err);
      });
  };
};

export const GetAllOrdersFromDB = (id) => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/order/api/orders", {
        params: {
          userId: id,
        },
      })
      .then((collection) => {
        let orders = collection.data;
        console.log(orders);
        orders.map((o) => dispatch(AddOrderToStore(o)));
      })
      .catch((err) => {
        console.log("error while fetching products", err);
      });
  };
};

export const UpdateOrderToDB = (id, status) => {
  return (dispatch) => {
    axios
      .post("http://localhost:9000/order/api/updateOrder", {
        id,
        status,
      })
      .then((collection) => {
        let order = collection.data;
        dispatch(UpdateOrderInStore(order));
        console.log(order);
      })
      .catch((err) => {
        console.log("error while updating order", err);
      });
  };
};
