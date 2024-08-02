import React, { useState } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.jpeg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};
const styles = (theme) => ({
  cardHeader: {
    "background-color": "purple",
    height: "70px",
    padding: "11px",
    color: "white",
  },
});

const Header = (props) => {
  const { classes } = props;
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [value, setValue] = useState(0);

  const openModalHandler = () => {
    setModelIsOpen(true);
    setValue(0);
  };

  const closeModalHandler = () => {
    setModelIsOpen(false);
  };

  const tabChangeHandler = (event, value) => {
    setValue(value);
  };

  const logoutHandler = (e) => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    props.setLoggedIn(false);
  };

  return (
    <div>
      <Grid container spacing={3} className="app-header">
        <Grid item xs={12} sm={6}>
          <img src={logo} className="app-logo" alt="Doctor App Logo" />
          <span className="app-name"> Doctor Finder</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          {!props.loggedIn ? (
            <div className="login-button">
              <Button
                variant="contained"
                color="primary"
                onClick={openModalHandler}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="login-button">
              <Button
                variant="contained"
                color="secondary"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Login"
        onRequestClose={closeModalHandler}
        style={customStyles}
      >
        <Card>
          <CardHeader className={classes.cardHeader} title="Authentication" />
          <CardContent>
            <Tabs className="tabs" value={value} onChange={tabChangeHandler}>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {value === 0 && (
              <Login
                loggedIn={props.loggedIn}
                setLoggedIn={props.setLoggedIn}
                closeModalHandler={closeModalHandler}
              />
            )}

            {value === 1 && (
              <Register
                setLoggedIn={props.setLoggedIn}
                closeModalHandler={closeModalHandler}
              />
            )}
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};
export default withStyles(styles)(Header);
