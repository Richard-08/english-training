import React, { Fragment } from "react";
import { TABLE_COLS } from "../contants";
import { useTranslation } from "react-i18next";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function LessonStats({ data }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 3 }}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {TABLE_COLS.map((col) => (
                <TableCell key={col.alias}>{t(col.name)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {TABLE_COLS.map((col) => (
                  <Fragment key={col.alias}>
                    {col.alias === "color" ? (
                      <TableCell>
                        <Box
                          sx={{
                            height: "25px",
                            width: "25px",
                            backgroundColor: item[col.alias],
                            borderRadius: "50%",
                          }}
                        ></Box>
                      </TableCell>
                    ) : (
                      <TableCell>{item[col.alias] || "-"}</TableCell>
                    )}
                  </Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
