import React, { Fragment } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";

function WithLoading({ loading, children }) {
  return <Fragment>{loading ? <Loader /> : children}</Fragment>;
}

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
});

export default connect(mapStateToProps)(WithLoading);
