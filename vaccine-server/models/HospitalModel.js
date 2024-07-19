let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/vaccinedb");

let hospitalSchema = new schemaObj({
  name: {type: String, required : true},
  address: {type: String, required : true},
  type: {type: String, required : true},
  phone: {type: String, required: true},
  appointmentList: []
},
{
  versionKey: false
}
)

let HospitalModel = mongooseObj.model("hospital", hospitalSchema);//user - collection name, pluralised by mongodb

module.exports = HospitalModel;

