import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { logoutUser, clearCurrentProfile } from "../../actions/auth";
import { createNotification } from "../../utils/helpers";
import config from "../../config";
import lang from "../../langs";
import logo from "../../img/ExpleoLogo.png";
import "./layout.css";

class Navbar extends Component {
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
    return (
      <nav className="navbar navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img src={logo} width="150" alt="Logo" />
        </Link>
        <div>
        <a className="usernameStyle">Welcome {this.props.username}      </a>
        <a
          href="#"
          className="logoutStyle"
          onClick={this.onLogoutClick.bind(this)}
        >
          {lang("logout")}
        </a>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  username: state.auth.user.data.username
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
