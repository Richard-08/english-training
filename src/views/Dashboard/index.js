import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <Typography variant="h3" my={3}>
      {t("dashboard")}
    </Typography>
  );
}
