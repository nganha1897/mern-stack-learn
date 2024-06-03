let express = require("express");

let cartRouter = express.Router({});

let CartDataModel = require("../DataModels/CartDataModel");

cartRouter.post("/api/createCartCheckout", (req, res) => {
  let newCart = new CartDataModel(req.body);
  console.log(newCart);
  newCart
    .save()
    .then((newCart) => {
      console.log("cart successfully created");
      res.send(newCart);
    })
    .catch((err) => {
      console.log("error creating cart");
      res.send("error creating cart");
    });
});

module.exports = cartRouter;
