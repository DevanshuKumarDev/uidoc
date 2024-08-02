import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as fetchApi from "../../util/fetch";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    width: "50%",
    transform: "translate(-50%, -50%)",
    "background-color": "rgba(255, 255, 255, 1)",
  },
};

const styles = (theme) => ({
  paper: {
    textAlign: "left",
    margin: "15px",
    padding: "20px",
    cursor: "pointer",
  },
  cardHeader: {
    "background-color": "purple",
    height: "70px",
    padding: "11px",
    color: "white",
  },
});

const BookAppointment = (props) => {
  const { bookAppointment, closeModelCallBack, selectedDocDetails, classes } =
    props;

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");

  useEffect(() => {
    getAvailableSlots();
  }, [selectedDate, selectedDocDetails.id]);

  const getAvailableSlots = async () => {
    if (
      selectedDocDetails === null ||
      selectedDocDetails === undefined ||
      selectedDocDetails.id === undefined
    )
      return;

    const date = selectedDate.toISOString().split("T")[0];
    let response = await fetchApi.getData(
      "doctors/" + selectedDocDetails.id + "/timeSlots?date=" + date
    );
    if (response.status === 200) {
      response = await response.json();
      setAvailableSlots(response.timeSlot);
      setSelectedTimeSlot("");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  useEffect(() => {
    if (selectedTimeSlot === "") {
      setIsTimeSlotSelected(false);
    } else {
      setIsTimeSlotSelected(true);
    }
  }, [selectedTimeSlot]);

  const bookAppointmentApiCall = async () => {
    if (!isTimeSlotSelected) return;

    const data = {
      doctorId: selectedDocDetails.id,
      doctorName:
        selectedDocDetails.firstName + " " + selectedDocDetails.lastName,
      userId: sessionStorage.getItem("uuid"),
      userEmailId: sessionStorage.getItem("uuid"),
      timeSlot: selectedTimeSlot,
      appointmentDate: selectedDate.toISOString().split("T")[0],
      symptoms: symptoms,
      priorMedicalHistory: medicalHistory,
    };
    let response = await fetchApi.postData("appointments", data);
    if (response.status === 200) {
      closeModelCallBack();
      alert("Appointment booked Successfully.");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Modal
      isOpen={bookAppointment}
      contentLabel="Login"
      onRequestClose={closeModelCallBack}
      style={customStyles}
    >
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Book an Appointment"
        ></CardHeader>
        <CardContent>
          <TextField
            required
            id="standard-required"
            label="DoctorName"
            disabled
            defaultValue={
              selectedDocDetails.firstName + " " + selectedDocDetails.lastName
            }
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                minDate={new Date()}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Timeslot
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={selectedTimeSlot}
              onChange={(e) => {
                setSelectedTimeSlot(e.target.value);
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {availableSlots.map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
            {!isTimeSlotSelected && (
              <FormHelperText>
                <span className="red">Select a time slot</span>
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-multiline-static"
              label="Medical History"
              multiline
              rows={4}
              placeholder="ex:Diabetes,Ulcer, etc"
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-multiline-static"
              label="Symptoms"
              multiline
              rows={4}
              placeholder="ex:Cold, Swelling, etc"
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={bookAppointmentApiCall}
          >
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};
export default withStyles(styles)(BookAppointment);
