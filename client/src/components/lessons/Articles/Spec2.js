import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Specification() {
  return (
    <Box>
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
    </Box>
  );
}
