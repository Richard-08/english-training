import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAll, deleteWord } from "../../store/actions/dictionary";

import SearchForm from "./SearchForm";
import AddForm from "./AddForm";
import WordsTable from "./WordsTable";
import TablePagination from "@mui/material/TablePagination";
import WithLoading from "../../components/WithLoading";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ROWS_PER_PAGE = 10;

const Dictionary = ({ dictionary, categories, getAll, deleteWord }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE);

  useEffect(() => {
    getAll();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            <TablePagination
              component="div"
              count={filtered_dictionary().length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
  getAll,
  deleteWord,
})(Dictionary);
