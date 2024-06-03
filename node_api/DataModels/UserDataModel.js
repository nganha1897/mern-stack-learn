//import mongoose, use mongoose to create db if not there a connection
//a scheme to demonstrate the data key value pairs + validations
//using schema create a datamodel to provide mongoose methods to access modify data
//and create the collection

//This data model will allow us to do mapping with mongodb using mongoose
//MongoDB - non-relational, document oriented DB, non-schema
//create a connection using mongodb client, 
//use mongoose to make connection to mongodb
//get schema object created and also develop data model to be used in api
//set validations and data types in schema
//although mongodb is schema less but with mongoose we can create schema to start with
let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect("mongodb://127.0.0.1/mernstack18"); 

let userSchema = new schemaObj({
    userName : {type: String, required : true},
    password: {type:String, required : true},
    street: String,
    mobile: Number
},
{
    versionKey: false //false - set to false then it wont create in mongodb
}
)

let UserModel = mongooseObj.model("user", userSchema);//user - collection name, pluralised by mongodb

module.exports = UserModel; // this can be used in router/s to access the mongoose model methods like select, update queries