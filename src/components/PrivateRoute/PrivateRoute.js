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
      let userPermissions = user.Permissions.map(p => p.TenQuyen);
      let routePers = per.split(" ");
      let isAccept = true;
      for (let j = 0; j < routePers.length; j++) {
        if (!userPermissions.includes(routePers[j])) {
          isAccept = false;
          break;
        }
      }
      return isAccept;
    } else {
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
