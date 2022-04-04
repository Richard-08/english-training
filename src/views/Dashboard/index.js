import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserStats } from "../../store/actions/stats";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";
import WithLoading from "../../components/common/WithLoading";
import { CHART_VIEWS } from "./contants";

import ToggleButtons from "../../components/common/ToggleButtons";
import UserStatsChart from "./UserStatsChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Dashboard({ data, getUserStats }) {
  const { t } = useTranslation();
  const title = t("dashboard");
  useDocumentTitle(title);

  const [view, setView] = useState(CHART_VIEWS[0].id);

  useEffect(() => {
    getUserStats();
  }, []);

  const handleViewChange = (e, value) => {
    if (value) {
      setView(value);
    }
  };

  const chartData = () => {
    return data[view];
  };

  return (
    <WithLoading>
      <Typography variant="h3" my={3}>
        {title}
      </Typography>
      {data && <UserStatsChart data={chartData()} />}
      <ToggleButtons
        value={view}
        data={CHART_VIEWS}
        handleChange={handleViewChange}
      />
    </WithLoading>
  );
}

const mapStateToProps = (state) => ({
  data: state.stats.data,
});

export default connect(mapStateToProps, {
  getUserStats,
})(Dashboard);
