let express = require("express");

let recentOrderRouter = express.Router({});

let RecentOrderDataModel = require("../DataModels/RecentOrderDataModel")

recentOrderRouter.post("/api/createOrder", (req, res) => {
  let newOrder = new RecentOrderDataModel(req.body);
  console.log(newOrder);
  newOrder
    .save()
    .then((newOrder) => {
      console.log("order successfully created");
      res.send(newOrder);
    })
    .catch((err) => {
      console.log("error creating order");
      res.send("error creating order");
    });
});

recentOrderRouter.get("/api/orders", (req, res) => {
  RecentOrderDataModel.find({userId: req.query.userId})
  .then((allOrders) => {
    res.send(allOrders)
  }).catch(() => {
    res.send("error while fetching all orders")
  })
})

recentOrderRouter.post("/api/updateOrder", (req, res) => {
  RecentOrderDataModel.findOneAndUpdate({_id: req.body.id}, {status: req.body.status}, {new: true})
  .then((order) => {
    console.log(order);
    console.log("order successfully updated");
    res.send(order);
  })
  .catch((err) => {
    console.log("error updating order");
      res.send("error updating order");
  });
});

module.exports = recentOrderRouter;