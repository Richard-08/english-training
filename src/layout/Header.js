import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

import ModeToggler from "../components/ModeToggler";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = ({ mode, toggleColorMode, auth, logout }) => {
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ mr: "auto" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to="/">
              <MenuItem onClick={handleClose}>Home</MenuItem>
            </Link>
            <Link to="/dictionary">
              <MenuItem onClick={handleClose}>Dictionary</MenuItem>
            </Link>
          </Menu>
          {!isAuthenticated ? (
            <Fragment>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </Fragment>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}

          <ModeToggler mode={mode} toggleColorMode={toggleColorMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
