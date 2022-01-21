import React, { Fragment, useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Notification = ({ error, message }) => {
  const { enqueueSnackbar } = useSnackbar();
  //const prevProps = usePrevious({ error, message });

  useEffect(() => {
    if (error.message) {
      enqueueSnackbar(error.message, { variant: "error" });
    }

    if (message.message) {
      enqueueSnackbar(message.message, { variant: message.status });
    }
  }, [error, message]);

  return <Fragment />;
};

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withSnackbar(Notification));
