import React from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    "background-color": "rgba(255, 255, 255, 1)",
    padding: 0,
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
const docDetails = (props) => {
  const { viewDoctorDetails, closeModelCallBack, selectedDocDetails, classes } =
    props;
  return (
    <Modal
      isOpen={viewDoctorDetails}
      contentLabel="Login"
      onRequestClose={closeModelCallBack}
      style={customStyles}
    >
      <Grid item xs justify key={selectedDocDetails.id}>
        <Card>
          <CardHeader
            className={classes.cardHeader}
            title="Doctor Details"
          ></CardHeader>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Dr:{" "}
              {selectedDocDetails.firstName + " " + selectedDocDetails.lastName}
            </Typography>
            <Typography variant="h6" component="h6">
              Total Experience: {selectedDocDetails.totalYearsOfExp} years
            </Typography>

            <Typography variant="h6" component="h6">
              Speciality : {selectedDocDetails.speciality}
            </Typography>
            <Typography variant="h6" component="h6">
              Date of Birth : {selectedDocDetails.dob}
            </Typography>

            {selectedDocDetails.address && (
              <Typography variant="h6" component="h6">
                City: {selectedDocDetails.address.city}
              </Typography>
            )}
            <Typography variant="h6" component="h6">
              Email: {selectedDocDetails.emailId}
            </Typography>

            <Typography variant="h6" component="h6">
              Mobile: {selectedDocDetails.mobile}
            </Typography>

            <Typography variant="h6" component="h6">
              Rating :
              {
                <Rating
                  className="mt-1"
                  name="read-only"
                  value={selectedDocDetails.rating}
                  readOnly
                />
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Modal>
  );
};

export default withStyles(styles)(docDetails);
