import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getLessons } from "../store/actions/lessons";

import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(9, 5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "relative",
}));

function Home({ lessons, getLessons }) {
  useEffect(() => {
    getLessons();
  }, []);

  return (
    <Box>
      <Typography variant="h3" my={3}>
        Lessons
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {lessons.map((item) => (
            <Grid item xs={2} sm={4} md={3} key={item.id}>
              <Link to={"/" + item.id}>
                <Item elevation={3}>
                  <Box sx={{ typography: "h5" }}>{item.name}</Box>
                  <Box sx={{ typography: "subtitle1" }}>
                    {item.count_repetitions} / {item.total_repetitions}
                  </Box>
                  <Box sx={{ typography: "subtitle1" }}>{item.last_visit}</Box>
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={
                        (item.count_repetitions * 100) / item.total_repetitions
                      }
                    />
                  </Box>
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Paper />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  lessons: state.lessons.lessons,
});

export default connect(mapStateToProps, { getLessons })(Home);
