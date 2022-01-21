import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/actions/auth";

import Header from "./layout/Header";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Lesson from "./views/Lesson";
import Dictionary from "./views/Dictionary/Dictionary";
import PrivateRoute from "./components/PrivateRoute";
import Notification from "./components/Notification";
import { SnackbarProvider } from "notistack";

import localStorageService from "./services/localStorageService";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const savedMode = localStorageService.get("theme");
  const [mode, setMode] = useState(savedMode || "light");

  useEffect(() => {
    store.dispatch(loadUser());
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
    localStorageService.set("theme", nextMode);
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
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/:lessonId" element={<PrivateRoute />}>
                  <Route path="/:lessonId" element={<Lesson />} />
                </Route>
                <Route path="/dictionary" element={<PrivateRoute />}>
                  <Route path="/dictionary" element={<Dictionary />} />
                </Route>
              </Routes>
            </Container>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
