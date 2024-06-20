let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/mernstack18");

let reviewSchema = new schemaObj({
  userId: { type: schemaObj.Types.ObjectId, ref: "user" },
  productId: { type: schemaObj.Types.ObjectId, ref: "product" },
  orderId: { type: schemaObj.Types.ObjectId, ref: "recent_order" },
  rating: Number,
  comment: String
},
{
  versionKey: false
})

let ReviewModel = mongooseObj.model("review", reviewSchema);
module.exports = ReviewModel;