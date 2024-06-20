let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/mernstack18");

let recentOrderSchema = new schemaObj({
  userId: { type: schemaObj.Types.ObjectId, ref: "user"},
  order: {},
  createdDate: Date,
  status: String 
},
{
  versionKey: false
})

let RecentOrderModel = mongooseObj.model("recent_order", recentOrderSchema);
module.exports = RecentOrderModel;