import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserStats } from "../../store/actions/stats";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";
import WithLoading from "../../components/common/WithLoading";

import UserStatsChart from "./UserStatsChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Dashboard({ data, getUserStats }) {
  const { t } = useTranslation();
  const title = t("dashboard");
  useDocumentTitle(title);

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <WithLoading>
      <Typography variant="h3" my={3}>
        {title}
      </Typography>
      {data && <UserStatsChart data={data} />}
    </WithLoading>
  );
}

const mapStateToProps = (state) => ({
  data: state.stats.data,
});

export default connect(mapStateToProps, {
  getUserStats,
})(Dashboard);
