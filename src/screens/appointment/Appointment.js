import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import * as fetchApi from "../../util/fetch";
import { withStyles } from "@material-ui/core/styles";

import RateAppointment from "./RateAppointment";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "left",

    padding: "20px",
    cursor: "pointer",
    width: "100%",
  },
  appList: {
    width: "40%",
  },
  app: {
    width: "100%",
    margin: "20px",
  },

  rate: {
    //float: "right",
  },
});

const Appointment = (props) => {
  const { classes, loggedIn } = props;

  const [appointments, setAppointments] = useState([]);

  const [isRating, setIsRating] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getAppointments = async () => {
    const response = await fetchApi.getData(
      `users/${sessionStorage.getItem("uuid")}/appointments`
    );
    if (response.status === 200) {
      var appList = await response.json();
      setAppointments(appList);
    } else {
      alert("Error while fetching Appointment list");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getAppointments();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">Login to see appointments</Typography>
      </Grid>
    );
  }
  return (
    <Grid
      container
      alignItems={"center"}
      direction={"column"}
      justifyContent={"space-evenly"}
      className={classes.root}
    >
      <RateAppointment
        closeModelCallBack={() => setIsRating(false)}
        isRating={isRating}
        selectedAppointment={selectedAppointment}
      />
      {appointments.map((app) => {
        return (
          <Grid item key={app.id} className={classes.app}>
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom>
                Dr: {app.doctorName}
              </Typography>
              <Typography variant="h6" component="h6">
                Date: {app.appointmentDate}
              </Typography>

              <Typography variant="h6" component="h6">
                Symptoms : {app.symptoms}
              </Typography>
              <Typography variant="h6" component="h6">
                priorMedicalHistory: {app.priorMedicalHistory}
              </Typography>
              <br />
              <br />
              <Button
                className={classes.rate}
                variant="contained"
                color="primary"
                onClick={() => {
                  if (!loggedIn) {
                    alert("Please login to book an appointment");
                  } else {
                    setSelectedAppointment(app);
                    setIsRating(true);
                  }
                }}
              >
                Rate Appointment
              </Button>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(Appointment);
