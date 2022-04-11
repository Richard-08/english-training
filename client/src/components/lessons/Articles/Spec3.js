import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Specification() {
  return (
    <Box>
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
