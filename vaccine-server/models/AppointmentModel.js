let mongooseObj = require("mongoose");
schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/vaccinedb");

let appointmentSchema = new schemaObj({
  userId: { type: schemaObj.Types.ObjectId, ref: "user"},
  registration: {},
  hospital: {},
  date: {type: String, required : true},
  time: {type: String, required : true},
  vaccineList: {type: Array, required: true},
  status: { type: String }
},
{
  versionKey: false
}
)

let AppointmentModel = mongooseObj.model("appointment", appointmentSchema);//user - collection name, pluralised by mongodb

module.exports = AppointmentModel;

