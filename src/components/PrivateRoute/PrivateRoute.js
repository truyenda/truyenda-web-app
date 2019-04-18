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
      console.log(auth);
      
      if (auth) {
        if (checkPermission(user, per)) return <Component {...props} />;
        else return <AccessDenied />;
      } else return <Redirect to="/login" />;
    }}
  />
);

const checkPermission = (user, per) => {
  if (per) {
    //TODO: check user and permission
    return true;
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
