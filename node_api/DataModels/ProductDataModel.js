let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/mernstack18");

let productSchema = new schemaObj({
  productName: {type: String, required: true},
  productDescription: String,
  price: Number,
  rating: Number,
  category: String,
  image: String
},
{
  versionKey: false
})

let ProductModel = mongooseObj.model("product", productSchema);
module.exports = ProductModel;
