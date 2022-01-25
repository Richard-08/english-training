import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getDictionary,
  getDictionaryCategories,
  deleteWord,
} from "../../store/actions/dictionary";

import SearchForm from "./SearchForm";
import AddForm from "./AddForm";
import WordsTable from "./WordsTable";
import TablePagination from "../../components/TablePagination";
import WithLoading from "../../components/WithLoading";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Dictionary = ({
  dictionary,
  categories,
  getDictionary,
  getDictionaryCategories,
  deleteWord,
}) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    getDictionaryCategories();
  }, []);

  useEffect(() => {
    getDictionary();
  }, []);

  const filtered_dictionary = () => {
    let data = dictionary;

    if (categoryFilter && categoryFilter.length) {
      data = data.filter((word) =>
        categoryFilter.some((cat) => cat.id === word.category_id)
      );
    }

    if (searchFilter && searchFilter.trim().length) {
      data = data.filter(
        (word) =>
          word.en.includes(searchFilter) || word.ru.includes(searchFilter)
      );
    }

    return data;
  };

  return (
    <Fragment>
      <Typography variant="h3" my={3}>
        Dictionary
      </Typography>
      <WithLoading>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <SearchForm
              categories={categories}
              search={searchFilter}
              category={categoryFilter}
              setSearch={setSearchFilter}
              setCategory={setCategoryFilter}
            />
            <AddForm />
          </Grid>
          <Grid item md={8} xs={12}>
            <WordsTable words={filtered_dictionary()} deleteWord={deleteWord} />
            <TablePagination />
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
  deleteWord,
})(Dictionary);
