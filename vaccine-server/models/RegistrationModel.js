let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/vaccinedb");

let registrationSchema = new schemaObj({
  name: {type: String, required : true},
  email: {type: String, required : true},
  age: {type: Number, required : true},
  phone: {type: String, required : true},
  address: {type: String, required : true},
  gender: {type: String, required : true},
  disease: {type: String},
  documents: {type: Array}
},
{
  versionKey: false
}
)

let RegistrationModel = mongooseObj.model("registration", registrationSchema);
module.exports = RegistrationModel;

