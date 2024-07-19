let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/vaccinedb");

let vaccineSchema = new schemaObj({
  name: {type: String, required : true},
  type: {type: String, required : true},
  price: {type: Number, required : true},
  dosesRequired: {type: Number, required : true},
  sideEffect: {type: String, required : true},
  origin: {type: String, required : true},
  strains: String
},
{
  versionKey: false
}
)

let VaccineModel = mongooseObj.model("vaccine", vaccineSchema);//user - collection name, pluralised by mongodb

module.exports = VaccineModel;