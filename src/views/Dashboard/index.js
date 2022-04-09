import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserStats } from "../../store/actions/stats";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";
import WithLoading from "../../components/common/WithLoading";
import { CHART_VIEWS } from "./contants";

import LessonStats from "./components/LessonStats";
import UserStats from "./components/UserStats";
import UserStatsChart from "./components/UserStatsChart";
import ToggleButtons from "../../components/common/ToggleButtons";
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

  const formattedData = () => {
    if (view === "week" || view === "month") {
      let labels = [...data[view].labels].map((date) => {
        return new Date(date).toLocaleDateString();
      });
      return {
        ...data[view],
        labels,
      };
    }

    return data[view];
  };

  const statViews = () => {
    return CHART_VIEWS.map((item) => {
      return {
        ...item,
        name: t(item.name),
      };
    });
  };

  const chartData = () => {
    let data = formattedData();
    return {
      ...data,
      labels: data.labels.map((label) => t(label)),
    };
  };

  return (
    <WithLoading>
      <Typography variant="h3" my={3}>
        {title}
      </Typography>
      {data && (
        <Fragment>
          <UserStats stats={data.stats} />
          <Box sx={{ height: "600px" }}>
            <UserStatsChart data={chartData()} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <ToggleButtons
              value={view}
              data={statViews()}
              handleChange={handleViewChange}
            />
          </Box>
          <LessonStats data={data.lessons} />
        </Fragment>
      )}
    </WithLoading>
  );
}

const mapStateToProps = (state) => ({
  data: state.stats.data,
});

export default connect(mapStateToProps, {
  getUserStats,
})(Dashboard);
