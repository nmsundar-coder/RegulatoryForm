const mongoose = require("mongoose");
const config = require("../config/database");
const AnnualDisclosureInterTradingSchema = mongoose.Schema({
  employeeId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  pan: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: false
  },
  clientId: {
    type: String,
    required: false
  },
  directorIdentificationNo: {
    type: String
  },
  otherGovtId: {
    type: String
  },
  otherGovtIdNo: {
    type: String
  },
  agreed: {
    type: Boolean,
    required:true
  },
  phoneNumber: {
    type: String,
    required:false
  },
  educationalInstitutes: {
    type: Array,
    required:false
  },
 employers: {
    type: Array,
    required:false
  },
 immediateRelatives: {
    type: Array,
    required:false
  },
  otherPersons: {
    type: Array,
    required:false
  },
  createdDate: {
    type: Date,
    required:false
  },
  designation: {
    type: String,
    required:true
  }
});

const annualDisclosureInterTrading = (module.exports = mongoose.model("AnnualDisclosureInterTrading", AnnualDisclosureInterTradingSchema));


module.exports.getData = function(callback) {
  annualDisclosureInterTrading.find(callback);
};


module.exports.addData = function(newData, callback) {
      
      let now = new Date();
      newData.createdDate = now;
      newData.save(callback);

};

