import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../common/Loader";

const PrivateRoute = ({ auth, children }) => {
  if (auth.isLoading) {
    return <Loader />;
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
