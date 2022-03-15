import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Specification() {
  const rows = [
    {
      name: "Неопределенное лицо или предмет (в единственном числе)",
      value_1: "a / an",
      value_2: "-",
    },
    {
      name: "Конкретные люди или вещи (единственное или множественное число)",
      value_1: "the",
      value_2: "the",
    },
    {
      name: "Все вещи или вещи вообще (множественное число)",
      value_1: "-",
      value_2: "-",
    },
  ];
  return (
    <Box>
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
                <TableCell align="right">{row.value_1}</TableCell>
                <TableCell align="right">{row.value_2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5">
        <b>Неопределенные артикли</b>
      </Typography>
      <Typography variant="body">
        В английском языке есть три неопределенных артикля:
        <ul>
          <li>
            <b>a / an</b> - для единственного числа
          </li>
          <li>
            <b>some</b> - для множественного числа
          </li>
        </ul>
        Неопределенный артикль импользуется в следующих случаях:
        <ul>
          <li>Мы обращаемся к чему-то в первый раз</li>
          <li>Мы говорим не о чем то конкретном, а общем</li>
        </ul>
      </Typography>
      <Typography variant="h6">
        <b>a / an</b>
      </Typography>
      <Typography variant="body">
        Используем <b>«a»</b> перед согласной и <b>«аn»</b> перед гласной (а, е,
        и, о, и).
      </Typography>
      <Typography variant="h6">
        <b>some</b>
      </Typography>
      <Typography variant="body">
        Используем <b>«some»</b> для формы множественного числа всех
        существительных и для неисчиляемых. (Неисчисляемое существительное — это
        слово, имеющее форму единственного числа, например, «сахар».)
      </Typography>
      Here are some examples:
      <ul>
        <li>
          There's <b>a</b> cat in the garden!
        </li>
        <li>
          I need <b>a</b> stamp for this letter.
        </li>
        <li>
          Sally is <b>an</b> accountant. She works for <b>a</b> multinational
          company.
        </li>
        <li>
          We need <b>an</b> apple and <b>an</b> orange for the fruit salad.
        </li>
        <li>
          Is there <b>a</b> whiteboard in the classroom?
        </li>
        <li>
          Would you like <b>some</b> wine?
        </li>
        <li>
          Here are <b>some</b> photos of our last holiday.
        </li>
        <li>
          <b>Some</b> people are sunbathing in the park.
        </li>
        <li>
          There are <b>some</b> fun places to go in my town.
        </li>
        <li>
          I eat <b>some</b> biscuits and drink <b>some</b> coffee for breakfast
          every day.
        </li>
      </ul>
      <Typography variant="h5">
        <b>Определенный артикль</b>
      </Typography>
      <Typography variant="body">
        Определенный артикль в английском языке — <b>«the»</b>, и мы можем
        использовать его с существительными в единственном и множественном
        числе. Мы используем <b>«the»</b>, когда:
        <ul>
          <li>
            Мы уже определили существительное, о котором говорим, в предыдущей
            фразе.
          </li>
          <li>
            Эта вещь есть только одна (например, «вокзал» — в городе только
            одна)
          </li>
          <li>
            Мы используем определенные выражения, особенно связанные с
            физическими вещами, такими как «погода», «море», «окружающая среда».
          </li>
        </ul>
      </Typography>
      Here are some examples:
      <ul>
        <li>
          You can’t go to <b>the</b> post office now. It’s closed.
        </li>
        <li>
          Can you turn on <b>the</b> television?
        </li>
        <li>
          <b>The</b> shopping bags are still in <b>the</b> car. I’ll get them.
        </li>
        <li>
          Where’s <b>the</b> bottle-opener?
        </li>
        <li>
          <b>The</b> students are waiting for <b>the</b> lesson to start.
        </li>
        <li>
          <b>The</b> washing machine is broken. We need to get another one
        </li>
        <li>
          What’s <b>the</b> weather like in your country?
        </li>
      </ul>
      <Typography variant="h5">
        <b>Нет артикля</b>
      </Typography>
      <Typography variant="body">
        Основные случаи, когда мы не используем артикль:
      </Typography>
      <ul>
        <li>
          Не используйте артикль с притяжательными прилагательными. Например,
          «She’s my friend», а не «She’s a my friend.».
        </li>
        <li>
          Не используйте статью с общей темой. Например, сравните следующие
          предложения:
          <ul>
            <li>I love music. (имеется в виду музыка в целом)</li>
            <li>
              I love the music you’re playing. (имеется в виду эта конкретная
              музыка)
            </li>
          </ul>
        </li>
        <li>
          Не ставьте артикль перед названиями стран, за исключением тех случаев,
          когда они включают «королевство», «штаты» и «земли». Например:
          <ul>
            <li>France (without ‘the’)</li>
            <li>The Netherlands (with ‘the’)</li>
          </ul>
        </li>
      </ul>
    </Box>
  );
}
