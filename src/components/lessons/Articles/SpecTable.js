import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function SpecTable() {
  const rows = [
    {
      name: "Неопределенное лицо или предмет (в единственном числе)",
      counts: "a / an",
      uncountable: "-",
    },
    {
      name: "Конкретные люди или вещи (единственное или множественное число)",
      counts: "the",
      uncountable: "the",
    },
    {
      name: "Все вещи или вещи вообще (множественное число)",
      counts: "-",
      uncountable: "-",
    },
  ];
  return (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">ИСЧИСЛЯЕМЫЕ</TableCell>
            <TableCell align="right">НЕ ИСЧИСЛЯЕМЫЕ</TableCell>
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
              <TableCell align="right">{row.counts}</TableCell>
              <TableCell align="right">{row.uncountable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
