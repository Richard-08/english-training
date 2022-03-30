import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../../store/actions/auth";
import { PAGES, LOCALES } from "./constants";

import Dropdown from "../../common/Dropdown";
import ModeToggler from "../../common/ModeToggler";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = ({ mode, toggleColorMode, auth, logout }) => {
  const locales = LOCALES.map((locale) => locale.name);
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState(locales[0]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, user } = auth;

  const handleClick = (event) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLocale = (e) => {
    const locale = LOCALES.find((loc) => loc.name === e.target.value);

    if (locale) {
      setLocale(locale.name);
      i18n.changeLanguage(locale.alias);
    }
  };

  const pagesLinks = () => {
    return PAGES.map((page) => {
      return {
        ...page,
        name: t(page.alias),
      };
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls={open ? "menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ mr: "auto" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "button",
              }}
            >
              {pagesLinks().map((page) => (
                <Link to={page.path} key={page.path}>
                  <MenuItem onClick={handleClose}>{page.name}</MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesLinks().map((page) => (
              <Link to={page.path} key={page.path}>
                <Button color="inherit">{page.name}</Button>
              </Link>
            ))}
          </Box>

          {!isAuthenticated ? (
            <Fragment>
              <Link to="/login">
                <Button color="inherit">{t("login")}</Button>
              </Link>
              <Link to="/register">
                <Button color="inherit">{t("register")}</Button>
              </Link>
            </Fragment>
          ) : (
            <Button color="inherit" onClick={logout}>
              {t("logout")}
            </Button>
          )}

          <ModeToggler mode={mode} toggleColorMode={toggleColorMode} />
          <Dropdown
            value={locale}
            options={locales}
            minWidth={70}
            variant="standard"
            handleChange={changeLocale}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
