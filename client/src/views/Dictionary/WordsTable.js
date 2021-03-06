import React from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function WordsTable({ words, deleteWord }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>EN</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>RU</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {words.map((word) => (
            <TableRow
              key={word.en + word.ru}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {word.en}
              </TableCell>
              <TableCell>{word.ru}</TableCell>
              <TableCell>{word.category}</TableCell>
              <TableCell align="right">
                {word.user_id && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteWord(word.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
