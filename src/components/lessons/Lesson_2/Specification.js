import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Specification() {
  const rows = [
    {
      name: "Rule #1 Specific identity not known",
      value_1: "a, an",
      value_2: "	(no article)",
    },
    {
      name: "Rule #2 Specific identity known",
      value_1: "the",
      value_2: "the",
    },
    {
      name: "Rule #3 All things or things in general",
      value_1: "(no article)",
      value_2: "(no article)",
    },
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">COUNT NOUNS</TableCell>
            <TableCell align="right">NON-COUNT NOUNS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value_1}</TableCell>
              <TableCell align="right">{row.value_2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
