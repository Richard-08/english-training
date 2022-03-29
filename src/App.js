import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/actions/auth";

import Header from "./components/layout/Header";
import Login from "./views/Login";
import Register from "./views/Register";
import Lessons from "./views/Lessons";
import Dictionary from "./views/Dictionary";
import Dashboard from "./views/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
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
          <Router>
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
              <Routes>
                <Route
                  path="/lessons/*"
                  element={
                    <PrivateRoute>
                      <Lessons />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dictionary"
                  element={
                    <PrivateRoute>
                      <Dictionary />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
