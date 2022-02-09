import React from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../common/Loader";

const PrivateRoute = ({ auth }) => {
  if (auth.isLoading) {
    return <Loader />;
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
