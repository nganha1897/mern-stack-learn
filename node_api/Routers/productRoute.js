let express = require("express")

let productRouter = express.Router({})

let ProductDataModel = require("../DataModels/ProductDataModel")

productRouter.post("/api/createProduct", (req, res) => {
  ProductDataModel.findOne({productName:req.body.productName}).then((existingProduct) => {
    if (existingProduct) {
      console.log("product with this name already exists")
    } else {
      let newProduct = new ProductDataModel(req.body)
      newProduct.save().then((newProduct) => {
        console.log("product successfully created")
        res.send(newProduct)
      }).catch((err) => {
        console.log("error creating product")
        res.send("error creating product")
      })
    }
  })
})

productRouter.get("/api/products", (req, res) => {
  ProductDataModel.find()
  .then((allProducts) => {
    res.send(allProducts)
  }).catch(() => {
    res.send("error while fetching all products")
  })
})

module.exports = productRouter;