let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/mernstack18");

let cartSchema = new schemaObj({
  productList: [
    {
      _id: false,
      product: { type: schemaObj.Types.ObjectId, ref: "product"},
      qty: Number
    },
  ],
  totalPrice: Number,
  userId: { type: schemaObj.Types.ObjectId, ref: "user"},
},
{
  versionKey: false
})

let CartModel = mongooseObj.model("cart", cartSchema);
module.exports = CartModel;