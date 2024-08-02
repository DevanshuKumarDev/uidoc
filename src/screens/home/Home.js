import React, { useState } from "react";
import "./Home.css";
import Header from "../../common/header/Header";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "left",
    margin: "15px",
    padding: "20px",
    cursor: "pointer",
  },
  doctorList: {
    width: "40%",
  },
});

const Home = (props) => {
  const { classes } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("access-token") != null
  );

  return (
    <div className={classes.root}>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        baseUrl={props.baseUrl}
      />
      <Tabs
        value={tabIndex}
        onChange={(event, newValue) => setTabIndex(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
        className="context-tab"
      >
        <Tab label="Doctors" />
        <Tab label="Appointment" />
      </Tabs>
      {tabIndex === 0 && <DoctorList loggedIn={loggedIn} />}
      {tabIndex === 1 && <Appointment loggedIn={loggedIn} />}
    </div>
  );
};

export default withStyles(styles)(Home);
