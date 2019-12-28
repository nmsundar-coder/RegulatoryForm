import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { logoutUser, clearCurrentProfile } from "../../actions/auth";
import { createNotification } from "../../utils/helpers";
import Document from "../layout/Document";
import lang from "../../langs";
import WrappedRegistrationForm from "../form/innerForm.js"
import "./index.css";
import AdminForm from "../form/adminForm";

class Dashboard extends Component {
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
    let role = this.props.role;
    return (
      <Document title="Expleo InterTrading Annual Disclosure" className="dashboard-page">
        <div className="container">
          
            <div className="col">
              {role === "Member" ? 
              (<div> 
              <h2 className="headingStyle">
                ANNUAL DISCLOSURE BY DESIGNATED PERSONS
              </h2>
              <h5 className="headingStyle1">Disclosure by Designated Person pursuant to Regulation 14 of Schedule B of SEBI (Prohibition of Insider Trading Regulation)</h5>
              <br/>
              <br/>
              <WrappedRegistrationForm></WrappedRegistrationForm> </div> 
              ):( <div> <AdminForm></AdminForm> </div>)}
              <br />
            </div>
          
        </div>
      </Document>
    );
  }
}

Dashboard.propTypes = {
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
  Dashboard
);
