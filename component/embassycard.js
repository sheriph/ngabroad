import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import EditEmbassy from "./editembassy";
import OrderModal from "./ordermodal";

const styles = makeStyles((theme) => ({
  paper: {
    paddingTop: "10px",
    paddingBottom: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const EmbassyCard = ({ embassy }) => {
  const classes = styles();
  const {
    Title: title,
    Field: phone,
    Field1: phoneTitle,
    Field2: fax,
    Field3: faxTitle,
    Field4: websiteTitle,
    Field5: website,
    Field7: emailTitle,
    Field8: primaryEmail,
    Field9: email,
    Field10: address,
    Field11: addressTitle,
    Field12: officeHour,
    Field13: officeHourTitle,
    Field14: details,
    Field15: detailsTitle,
  } = embassy;
  const [openModal, setOpenModal] = useState(false);
  return (
    <Paper className={classes.paper}>
      <Grid container component={Container}>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <Typography variant="button">{title}</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <Divider />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>Phone</Typography>
            <Box component="span" dangerouslySetInnerHTML={{ __html: phone }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Fax</Typography>
            <Box component="span" dangerouslySetInnerHTML={{ __html: fax }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Website</Typography>
            <Box
              component="span"
              dangerouslySetInnerHTML={{ __html: website }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Email</Typography>
            <Box
              component="span"
              dangerouslySetInnerHTML={{ __html: primaryEmail }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "10px", marginTop: "10px" }}>
          <Divider />
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={12} sm={6}>
            <Typography>Address</Typography>
            <Box
              component="span"
              dangerouslySetInnerHTML={{ __html: address }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Office Hours</Typography>
            <Box
              component="span"
              dangerouslySetInnerHTML={{ __html: officeHour }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "10px", marginTop: "10px" }}>
          <Divider />
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={12} sm={6}>
            <Typography>Details</Typography>
            <Box
              component="span"
              dangerouslySetInnerHTML={{ __html: details }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditOutlined />}
              onClick={() => setOpenModal(true)}
              style={{ textTransform: "none" }}
              size="small"
            >
              Edit Contact
            </Button>
          </Grid>
          <OrderModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            jsx={<EditEmbassy title={title} setOpenModal={setOpenModal} />}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmbassyCard;
