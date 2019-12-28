import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { logoutUser, clearCurrentProfile } from "../../actions/auth";
import { createNotification } from "../../utils/helpers";
import Document from "../layout/Document";
import config from "../../config";
import lang from "../../langs";
import InnerForm from "./innerForm";
import "./style.css";
import { JsonToExcel } from "react-json-excel";
import WrappedRegistrationForm from "./innerForm";

class Form extends Component {
  constructor(props) {
    super(props);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();

    createNotification("info", lang("success.logout"));
  }

  render() {
    const fields = {
      index: "Index",
      guid: "GUID"
    };
    const style = {
      padding: "5px"
    };
    const data = [
      { index: 0, guid: "asdf231234" },
      { index: 1, guid: "wetr2343af" }
    ];
    let role = this.props.role;
    let username = this.props.username;
    return (
      <Document title="Dashboard Administrator" className="dashboard-page">
        <div className="container">
          <div className="row justify-content-md-center text-center mt-5">
            <div className="col">
              {console.log(this.props.auth.user.data.role)}
              <h3 className="headingStyle">
                ANNUAL DISCLOSURE BY DESIGNATED PERSONS
              </h3>
              <h2>Disclosure by Designated Person pursuant to Regulation 14 of Schedule B of SEBI (Prohibition of Insider Trading Regulation)</h2>
              <WrappedRegistrationForm></WrappedRegistrationForm>


              <br />
            </div>
          </div>
        </div>
      </Document>
    );
  }
}

Form.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  username: state.auth.user.data.username,
  role: state.auth.user.data.role
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile })(
  Form
);
