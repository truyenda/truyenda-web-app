import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AccessDenied from "../../screens/Error/AccessDenied.js";

const PrivateRoute = ({
  component: Component,
  auth: auth,
  user: user,
  per: per,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (auth) {
        if (checkPermission(user, per)) return <Component {...props} />;
        else return <AccessDenied />;
      } else return <Redirect to="/login" />;
    }}
  />
);

const checkPermission = (user, per) => {
  if (per) {
    if (per === "DASHBOARD" && user.Permissions.length !== 0) {
      return true;
    }
    if (user.Permissions.length !== 0) {
      for (let i = 0; i < user.Permissions.length; i++) {
        if (per.indexOf(user.Permissions[i].TenQuyen) !== -1) {
          return true;
        }
      }
      return false;
    }
  } else {
    return true;
  }
};

const mapState = state => ({
  user: state.session.user,
  auth: state.session.authenticated
});

export default connect(
  mapState,
  null
)(PrivateRoute);
