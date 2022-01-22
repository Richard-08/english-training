import React, { Fragment } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  getDictionary,
  getDictionaryCategories,
} from "../../store/actions/dictionary";

import SearchForm from "./SearchForm";
import AddForm from "./AddForm";
import WordsTable from "./WordsTable";
import WithLoading from "../../components/WithLoading";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Dictionary = ({
  dictionary,
  categories,
  getDictionary,
  getDictionaryCategories,
}) => {
  useEffect(() => {
    getDictionaryCategories();
  }, []);

  useEffect(() => {
    getDictionary();
  }, []);

  return (
    <Fragment>
      <Typography variant="h3" my={3}>
        Dictionary
      </Typography>
      <WithLoading>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <SearchForm categories={categories} />
            <AddForm />
          </Grid>
          <Grid item md={8} xs={12}>
            <WordsTable words={dictionary} />
          </Grid>
        </Grid>
      </WithLoading>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  dictionary: state.dictionary.dictionary,
  categories: state.dictionary.categories,
});

export default connect(mapStateToProps, {
  getDictionary,
  getDictionaryCategories,
})(Dictionary);
