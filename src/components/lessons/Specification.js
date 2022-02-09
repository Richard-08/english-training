import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const PRONOUNS_1 = "I, YOU, WE, THEY";
const PRONOUNS_2 = "HE, SHE";

const ROWS = [
  {
    time: "FUTURE",
    question: [
      {
        prefix: "WILL",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
    statement: [
      {
        prefix: "WILL",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
    negation: [
      {
        prefix: "WILL NOT",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
  },
  {
    time: "PRESENT",
    question: [
      {
        prefix: "DO",
        pronoun: PRONOUNS_1,
        verb: "LIVE",
      },
      {
        prefix: "DOES",
        pronoun: PRONOUNS_2,
        verb: "LIVE",
      },
    ],
    statement: [
      {
        pronoun: PRONOUNS_1,
        verb: "LIVE",
      },
      {
        pronoun: PRONOUNS_2,
        verb: "LIVES",
      },
    ],
    negation: [
      {
        prefix: "DON'T",
        pronoun: PRONOUNS_1,
        verb: "LIVE",
      },
      {
        prefix: "DOESN'T",
        pronoun: PRONOUNS_2,
        verb: "LIVE",
      },
    ],
  },
  {
    time: "PAST",
    question: [
      {
        prefix: "DID",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
    statement: [
      {
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVED",
      },
    ],
    negation: [
      {
        prefix: "DID NOT",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
  },
];

const ContentContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Content = styled("div")({
  padding: "1rem 0.5rem",
  margin: "5px",
});

export default function Specification() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="center">ВОПРОС</TableCell>
            <TableCell align="center">УТВЕРЖДЕНИЕ</TableCell>
            <TableCell align="center">ОТРИЦАНИЕ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow
              key={row.time}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {row.time}
              </TableCell>
              <TableCell align="center">
                {row.question.map((item, i) => (
                  <ContentContainer key={i}>
                    <Content style={{ backgroundColor: "#03a9f4" }}>
                      {item.prefix}
                    </Content>
                    <Content>{item.pronoun}</Content>
                    <Content style={{ backgroundColor: "#f50057" }}>
                      {item.verb}
                    </Content>
                  </ContentContainer>
                ))}
              </TableCell>
              <TableCell align="center">
                {row.statement.map((item, i) => (
                  <ContentContainer key={i}>
                    <Content>{item.pronoun}</Content>
                    {item.prefix && (
                      <Content style={{ backgroundColor: "#03a9f4" }}>
                        {item.prefix}
                      </Content>
                    )}
                    <Content style={{ backgroundColor: "#f50057" }}>
                      {item.verb}
                    </Content>
                  </ContentContainer>
                ))}
              </TableCell>
              <TableCell align="center">
                {row.negation.map((item, i) => (
                  <ContentContainer key={i}>
                    <Content>{item.pronoun}</Content>
                    <Content style={{ backgroundColor: "#03a9f4" }}>
                      {item.prefix}
                    </Content>
                    <Content style={{ backgroundColor: "#f50057" }}>
                      {item.verb}
                    </Content>
                  </ContentContainer>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
