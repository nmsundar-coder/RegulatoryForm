var express = require("express");
var bodyParser = require("body-parser");
var AnnualDisclosureInterTrading = require("../models/annualDisclosureInterTrading");

var router = express.Router();

router.post("/submit", (req, res, next) => {
  let newData = new AnnualDisclosureInterTrading({
    name: req.body.name,
    employeeId: req.body.employeeId,
    clientId: req.body.clientId,
    directorIdentificationNo: req.body.directorIdentificationNo,
    educationalInstitutes: req.body.educationalInstitutes,
    employers: req.body.employers,
    immediateRelatives: req.body.immediateRelatives,
    mobileNumber: req.body.mobileNumber,
    otherGovtId: req.body.otherGovtId,
    otherGovtIdNo: req.body.otherGovtIdNo,
    otherPersons: req.body.otherPersons,
    pan: req.body.pan,
    phoneNumber: req.body.phoneNumber,
    designation: req.body.designation,
    agreed: req.body.agreement
  });

  AnnualDisclosureInterTrading.addData(newData, err => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: "Failed to Save Information" });
    } else {
      res.status(200).json({ success: true, msg: "User Added Successfully" });
    }
  });
});

router.get("/",(req,res, next) => {
  AnnualDisclosureInterTrading.getData( (err, annualDisclosures) => {
    if (err) {
          res.status(400).send({ success: false, msg: "Failed to Save Information" });
    };
    if (!annualDisclosures) {
       res.status(400).send({ success: false, msg: "Record Not Found" });

    }else{
      console.log(annualDisclosures)
       res.json(annualDisclosures)
    }
  })
});

module.exports = router;
