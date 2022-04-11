import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Specification() {
  return (
    <Box>
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
    </Box>
  );
}
