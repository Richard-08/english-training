import React, { useEffect, useState } from "react";
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
import DropdownSearch from "../../components/common/DropdownSearch";

function Home({ lessons, categories, getLessons }) {
  useDocumentTitle("Home");

  const [category, setCategory] = useState(null);

  useEffect(() => {
    getLessons();
  }, []);

  const changeFilter = (value) => {
    setCategory(value);
  };

  const filteredLessons = () => {
    if (category) {
      return lessons.filter((lesson) => lesson.category_id === category.id);
    }

    return lessons;
  };

  return (
    <Box>
      <Typography variant="h3" my={3}>
        Lessons
      </Typography>
      <WithLoading>
        <Box sx={{ flexGrow: 1, pb: 5 }}>
          <DropdownSearch
            options={categories}
            value={category}
            onChange={changeFilter}
            label="Lesson category"
            placeholder="Category"
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
          >
            {filteredLessons().map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item.id}>
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
  lessons: state.lessons.data.lessons,
  categories: state.lessons.data.categories,
});

export default connect(mapStateToProps, { getLessons })(Home);
