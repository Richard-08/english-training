import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/actions/auth";
import Router from "./router";

import Header from "./components/layout/Header";
import Notification from "./components/common/Notification";
import { SnackbarProvider } from "notistack";

import ls from "./services/ls";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const savedMode = ls.theme.get();
  const [mode, setMode] = useState(savedMode || "light");

  useEffect(() => {
    store.dispatch(loadUser());
    ls.lessons.clear();
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    setMode(nextMode);
    ls.theme.set(nextMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <BrowserRouter>
            <Container
              sx={{
                bgcolor: "background.paper",
                height: "100vh",
                padding: "0 15px",
              }}
              maxWidth="lg"
            >
              <CssBaseline />
              <Header mode={mode} toggleColorMode={toggleColorMode} />
              <Notification />
              <Router />
            </Container>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
