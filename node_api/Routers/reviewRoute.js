let express = require("express");

let reviewRouter = express.Router({});

let ReviewDataModel = require("../DataModels/ReviewDataModel");

reviewRouter.post("/api/createReview", (req, res) => {
  const promises = req.body.map(review => {
    let newReview = new ReviewDataModel(review);
    return newReview.save();
  });

  Promise.all(promises)
    .then(savedReviews => {
      console.log("Reviews successfully created:", savedReviews);
      res.json(savedReviews); // Send the array of saved reviews as JSON response
    })
    .catch(error => {
      console.error("Error saving reviews:", error);
      res.status(500).json({ error: "Error saving reviews" });
    });
});

reviewRouter.get("/api/reviews", (req, res) => {
  ReviewDataModel.find({productId: req.query.productId})
  .then((allOrders) => {
    res.send(allOrders)
  }).catch(() => {
    res.send("error while fetching all orders")
  })
})

module.exports = reviewRouter;