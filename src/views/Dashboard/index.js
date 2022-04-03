import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserStats } from "../../store/actions/stats";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";

import Typography from "@mui/material/Typography";

function Dashboard({ data, getUserStats }) {
  const { t } = useTranslation();
  const title = t("dashboard");
  useDocumentTitle(title);

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <Typography variant="h3" my={3}>
      {title}
    </Typography>
  );
}

const mapStateToProps = (state) => ({
  data: state.stats.data,
});

export default connect(mapStateToProps, {
  getUserStats,
})(Dashboard);
