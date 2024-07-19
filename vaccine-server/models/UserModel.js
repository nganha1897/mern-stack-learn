let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/vaccinedb");

let userSchema = new schemaObj({
  username: {type: String, required : true},
  email: {type: String, required : true},
  password: {type: String, required : true}
},
{
  versionKey: false
}
)

let UserModel = mongooseObj.model("user", userSchema);//user - collection name, pluralised by mongodb

module.exports = UserModel;