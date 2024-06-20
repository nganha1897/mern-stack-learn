import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddReviewToStore = (reviews) => {
  return {
    type: actionTypes.CREATE_REVIEW,
    payload: reviews,
  };
};

export const AddProductReviewToStore = (reviews) => {
  return {
    type: actionTypes.ADD_PRODUCT_REVIEW,
    payload: reviews,
  };
};

export const EmptyReviews = () => {
  return {
    type: actionTypes.CLEAR_REVIEWS
  }
}

export const SaveReviewToDB = (reviews) => {
  return (dispatch) => {
    axios
      .post("http://localhost:9000/review/api/createReview", reviews)
      .then((collection) => {
        let reviews = collection.data;
        dispatch(AddReviewToStore(reviews))
        console.log(reviews);
      })
      .catch((err) => {
        console.log("error while creating reviews", err);
      });
  };
};

export const GetAllReviewsFromDB = (id) => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/review/api/reviews", {
        params: {
          productId: id,
        },
      })
      .then((collection) => {
        let reviews = collection.data;
        dispatch(EmptyReviews());
        reviews.map((r) => dispatch(AddProductReviewToStore(r)));
      })
      .catch((err) => {
        console.log("error while fetching products", err);
      });
  };
};

// export const UpdateOrderToDB = (id, status) => {
//   return (dispatch) => {
//     axios
//       .post("http://localhost:9000/order/api/updateOrder", {
//         id,
//         status,
//       })
//       .then((collection) => {
//         let order = collection.data;
//         dispatch(UpdateOrderInStore(order));
//         console.log(order);
//       })
//       .catch((err) => {
//         console.log("error while updating order", err);
//       });
//   };
// };
