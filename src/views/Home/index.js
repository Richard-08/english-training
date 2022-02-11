import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getLessons } from "../../store/actions/lessons";
import WithLoading from "../../components/common/WithLoading";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";

import LessonItem from "./LessonItem";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Home({ lessons, getLessons }) {
  useDocumentTitle("Home");
  useEffect(() => {
    getLessons();
  }, []);

  return (
    <Box>
      <Typography variant="h3" my={3}>
        Lessons
      </Typography>
      <WithLoading>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
          >
            {lessons.map((item) => (
              <Grid item xs={2} sm={4} md={3} key={item.id}>
                <Link to={"/" + item.id}>
                  <LessonItem item={item}></LessonItem>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Paper />
      </WithLoading>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  lessons: state.lessons.lessons,
});

export default connect(mapStateToProps, { getLessons })(Home);
