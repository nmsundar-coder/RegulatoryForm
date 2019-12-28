import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser, clearCurrentProfile } from "../../actions/auth";
import Document from "../layout/Document";
import "./style.css";
import { CSVLink,CSVDownload } from "react-csv";
import CsvDownloader from 'react-csv-downloader';


import { getAnnualDisclosure } from "../../actions/annualDisclosure.js";
var jsonexport = require('jsonexport');


class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      csvData:{}
    }
  }

  componentWillMount() {
    this.props.getAnnualDisclosure();
    var data = this.props.annualDisclosures
    jsonexport(data,(err, csv) => {
      if(err) return console.log(err);
      console.log(csv);
      console.log(this.state.csvData);
      this.state.csvData= csv;
  });

  }

  

  render() {
    console.log(this.props.annualDisclosures)
    return (

      <Document title="Dashboard Administrator" className="dashboard-page">
        <div className="container">
          <div className="row justify-content-md-center text-center mt-5">
            <div className="col">
              <table>
                <tr>
                  <h3 className="headingStyle">ANNUAL DISCLOSURE REPORT</h3>
                </tr>
                <tr></tr>
                <br />
                <br />
                <tr></tr>
                <tr>
                  <CSVLink
                    data={this.state.csvData}
                    filename="my-file.csv"
                    className="btn btn-primary"
                    target="_blank"
                  >
                    Export Report to CSV
                  </CSVLink>
                  <CSVDownload data={this.state.csvData} target="_blank" filename={"hello.csv"}>Download Me</CSVDownload>;

                  
          
                </tr>
              </table>
            </div>
          </div>
        </div>
      </Document>
    );
  }
}

AdminForm.propTypes = {
  
  getAnnualDisclosure: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  
  
  annualDisclosures: state.annualDisclosure.data
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile,getAnnualDisclosure })(
  AdminForm
);
