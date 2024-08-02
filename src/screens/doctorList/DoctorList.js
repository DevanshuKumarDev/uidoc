import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";
import * as fetchApi from "../../util/fetch";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DocDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";

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
  formControl: {
    marginTop: "20px",
  },
  bookAppointment: {
    width: "40%",
    margin: "10px",
  },
  viewDetails: {
    width: "48%",
    backgroundColor: "green",
    margin: "10px",
  },
});

const DoctorList = (props) => {
  const { classes, loggedIn } = props;
  const DOCTOR_FETCH_API_PATH = "doctors";

  const [viewDoctorDetails, setViewDoctorDetails] = useState(false);

  const [selectedDocDetails, setSelectedDocDetails] = useState({});

  const [speciality, setSpeciality] = useState("");

  const [doctorList, setDoctorList] = useState([]);

  const [specialityList, setSpecialityList] = useState([]);

  const [bookAppointment, setBookAppointment] = useState(false);

  const getDocDetails = async () => {
    const response = await fetchApi.getData(
      DOCTOR_FETCH_API_PATH + "?speciality=" + speciality
    );

    if (response.status === 200) {
      var docList = await response.json();
      setDoctorList(docList);
    } else {
      alert("Error while fetching Doctor list");
    }
  };
  const getAllSpeciality = async () => {
    const response = await fetchApi.getData(
      DOCTOR_FETCH_API_PATH + "/speciality"
    );

    if (response.status === 200) {
      var specialityList = await response.json();
      setSpecialityList(specialityList);
    } else {
      alert("Error while fetching Doctor's speciality list");
    }
  };

  useEffect(() => {
    getDocDetails();
  }, [speciality]);

  useEffect(() => {
    getAllSpeciality();
  }, []);

  const docCard = (doc) => {
    return (
      <Grid item xs key={doc.id}>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Doctor Name : {doc.firstName + " " + doc.lastName}
          </Typography>

          <br />
          <Typography variant="h6" component="h6">
            Speciality : {doc.speciality}
          </Typography>

          <Typography variant="h6" component="h6">
            Rating :
            {
              <Rating
                className="mt-1"
                name="read-only"
                value={doc.rating}
                readOnly
              />
            }
          </Typography>
          <div>
            <Button
              className={classes.bookAppointment}
              variant="contained"
              color="primary"
              onClick={() => {
                if (!loggedIn) {
                  alert("Please login to book an appointment");
                } else {
                  setSelectedDocDetails(doc);
                  setBookAppointment(true);
                }
              }}
            >
              Book Appointment
            </Button>
            <Button
              className={classes.viewDetails}
              variant="contained"
              color="secondary"
              onClick={() => {
                setSelectedDocDetails(doc);
                setViewDoctorDetails(true);
              }}
            >
              View Details
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  };

  return (
    <Grid
      container
      spacing={10}
      alignItems={"center"}
      direction={"column"}
      justifyContent={"space-evenly"}
    >
      <DocDetails
        closeModelCallBack={() => setViewDoctorDetails(false)}
        viewDoctorDetails={viewDoctorDetails}
        selectedDocDetails={selectedDocDetails}
      />
      <BookAppointment
        closeModelCallBack={() => setBookAppointment(false)}
        bookAppointment={bookAppointment}
        selectedDocDetails={selectedDocDetails}
      />
      {specialityList.length > 0 && (
        <div>
          <FormControl
            className="md-padding"
            variant="filled"
            className={classes.formControl}
          >
            <Typography variant="h6" component="h6">
              Select Speciality:
            </Typography>
            <span>
              <Select
                native
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option aria-label="None" value="" />
                {specialityList.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </Select>
            </span>
          </FormControl>
        </div>
      )}
      <div className={classes.doctorList}>
        {doctorList.map((doc) => docCard(doc))}
      </div>
    </Grid>
  );
};

export default withStyles(styles)(DoctorList);
