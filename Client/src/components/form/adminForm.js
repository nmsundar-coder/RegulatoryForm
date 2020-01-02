import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes  from "prop-types";
import { logoutUser, clearCurrentProfile } from "../../actions/auth";
import Document from "../layout/Document";
import "./style.css";
import { getAnnualDisclosure } from "../../actions/annualDisclosure.js";
var jsonexport = require("jsonexport");

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: {}
    };
  }

  async componentWillMount() {
    await this.props.getAnnualDisclosure();    
  }

  download() {
    alert(this.state.csvData);
  }

  downloadTxtFile = () => {
    

    jsonexport(this.props.annualDisclosures, function(err, csv) {
      if (err) {
        return console.log(err);
      } else {
        console.log("Result", csv);
        const element = document.createElement("a");
        const file = new Blob([csv], { type: "text/csv" });
        element.href = URL.createObjectURL(file);
        element.download = "annualDisclosureReport.csv";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }
    });

   
  };

  render() {
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
                  {/* <CSVDownload data={this.state.csvData} target="_blank" filename={"hello.csv"}>Download Me</CSVDownload>; */}

                  {/* <a href={this.state.csvData} download on> Export Report</a> */}
                </tr>
              </table>
              <button onClick={this.downloadTxtFile}>Export Annual Disclosure Report</button>
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

export default connect(mapStatetoProps, {
  logoutUser,
  clearCurrentProfile,
  getAnnualDisclosure
})(AdminForm);
