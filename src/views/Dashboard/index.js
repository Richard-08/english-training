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
    if (view === "week" || view === "month") {
      let labels = [...data[view].labels].map((date) =>
        date.split(".").slice(0, 2).join(".")
      );
      return {
        ...data[view],
        labels,
      };
    }

    return data[view];
  };

  return (
    <WithLoading>
      <Typography variant="h3" my={3}>
        {title}
      </Typography>
      <Box sx={{ height: "600px" }}>
        {data && <UserStatsChart data={chartData()} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <ToggleButtons
          value={view}
          data={CHART_VIEWS}
          handleChange={handleViewChange}
        />
      </Box>
    </WithLoading>
  );
}

const mapStateToProps = (state) => ({
  data: state.stats.data,
});

export default connect(mapStateToProps, {
  getUserStats,
})(Dashboard);
