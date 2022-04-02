import React, { useEffect, useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import { connect } from "react-redux";
import { getLessons } from "../../store/actions/lessons";
import WithLoading from "../../components/common/WithLoading";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";
import { FILTERS } from "./constants";
import { useTranslation } from "react-i18next";

import LessonItem from "./LessonItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DropdownSearch from "../../components/common/DropdownSearch";

function LessonsList({ lessons, categories, getLessons }) {
  const { t } = useTranslation();
  const title = t("lessons");

  useDocumentTitle(title);

  const [category, setCategory] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    getLessons();
  }, []);

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  const formattedLessons = () => {
    return lessons.map((lesson) => {
      if (lesson.started_at) {
        lesson.status = "progress";
      } else if (
        lesson.progress &&
        lesson.repetitions &&
        lesson.progress >= lesson.repetitions
      ) {
        lesson.status = "completed";
      } else {
        lesson.status = "new";
      }
      return lesson;
    });
  };

  const filteredLessons = () => {
    let ret = formattedLessons();

    if (category) {
      ret = ret.filter((lesson) => lesson.category_id === category.id);
    }

    if (filter) {
      ret = ret.filter((lesson) => lesson.status === filter.alias);
    }

    return ret;
  };

  return (
    <Box py={3}>
      <Typography variant="h3">{title}</Typography>
      <WithLoading>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          py={4}
        >
          <Grid item xs={2} sm={4} md={4}>
            <DropdownSearch
              options={categories}
              value={category}
              onChange={handleCategory}
              label="Category"
              placeholder="Category"
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <DropdownSearch
              options={FILTERS}
              value={filter}
              onChange={handleFilter}
              label="Status"
              placeholder="Status"
            />
          </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
          >
            {filteredLessons().map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item.id}>
                <Link to={"/lessons/" + item.id}>
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

export default connect(mapStateToProps, { getLessons })(LessonsList);
