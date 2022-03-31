import React from "react";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";

import Typography from "@mui/material/Typography";

export default function Dashboard() {
  const { t } = useTranslation();
  const title = t("dashboard");

  useDocumentTitle(title);

  return (
    <Typography variant="h3" my={3}>
      {title}
    </Typography>
  );
}
