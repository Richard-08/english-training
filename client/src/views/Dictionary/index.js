import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAll,
  deleteWord,
  deleteCategory,
} from "../../store/actions/dictionary";
import { useTranslation } from "react-i18next";

import SearchForm from "./SearchForm";
import AddWordForm from "./AddWordForm";
import AddCategoryForm from "./AddCategoryForm";
import WordsTable from "./WordsTable";
import TablePagination from "@mui/material/TablePagination";
import WithLoading from "../../components/common/WithLoading";
import useDocumentTitle from "../../components/hooks/useDocumentTitle";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ROWS_PER_PAGE = 10;

const Dictionary = ({
  dictionary,
  categories,
  getAll,
  deleteWord,
  deleteCategory,
}) => {
  const { t } = useTranslation();
  const title = t("dictionary");
  
  useDocumentTitle(title);

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

    return data.map((word) => {
      return {
        ...word,
        category:
          categories.find((cat) => cat.id === word.category_id)?.name ||
          word.category_id,
      };
    });
  };

  const paginated_dictionary = () => {
    return filtered_dictionary().slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  return (
    <Box py={3}>
      <Typography variant="h3" mb={3}>
        {title}
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
              deleteCategory={deleteCategory}
            />
            <AddWordForm />
            <AddCategoryForm />
          </Grid>
          <Grid item md={8} xs={12}>
            <WordsTable
              words={paginated_dictionary()}
              deleteWord={deleteWord}
            />
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
    </Box>
  );
};

const mapStateToProps = (state) => ({
  dictionary: state.dictionary.dictionary,
  categories: state.dictionary.categories,
});

export default connect(mapStateToProps, {
  getAll,
  deleteWord,
  deleteCategory,
})(Dictionary);
