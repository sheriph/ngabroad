import {
  Button,
  ButtonGroup,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { CallOutlined, EmailOutlined, HouseOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const styles = makeStyles((theme) => ({
  button: {
    justifyContent: "flex-start",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: "30px",
  },
  alert: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  alertIcon: {
    color: "white !important",
  },
}));

const ContactUs = () => {
  const classes = styles();
  const { register, handleSubmit, control } = useForm();
  const [isFormSubmitted, setSubmitted] = useState(false);
  const [enter, setEnter] = useState(false);
  const [isloading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    axios
      .post(
        "https://hook.integromat.com/14b7wp6j2m9jbm26owtfr4ff7kprnyyp",
        data
      )
      .then((response) => {
        console.log(response);
        setSubmitted(true);
        setLoading(false)
        setTimeout(() => {
          setEnter(true);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      spacing={3}
      component={Container}
      className={classes.container}
    >
      <Grid item container xs={12} sm={5}>
        <Grid
          item
          container
          alignItems="center"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item>
            <Typography>Send us an email</Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
        {isFormSubmitted ? (
          <Grid container justify="center">
            <Grid item>
              <img
                src="/images/mailsent.svg"
                alt="mailsent"
                width="100%"
                height="100px"
              />
            </Grid>
            <Grid item>
              <Collapse in={enter} timeout={300}>
                <Alert
                  classes={{
                    icon: classes.alertIcon,
                  }}
                  className={classes.alert}
                >
                  Your email has been sent. We will get back to you soon.
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
        ) : (
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="name"
                fullWidth
                label="Your Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="email"
                fullWidth
                label="Your Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="phone"
                fullWidth
                label="Your Telephone Number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Your Message"
                inputRef={register}
                name="message"
                multiline
                rows={4}
                //  defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isloading}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                startIcon={
                  isloading ? <CircularProgress color="primary" /> : ""
                }
              >
                SEND
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item container xs={12} sm={7}>
        <Grid item xs={12}>
          <img src="/images/contactus.svg" height="300px" width="100%" />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <ButtonGroup
              size="large"
              variant="contained"
              orientation="vertical"
              fullWidth
              color="primary"
            >
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<CallOutlined />}
              >
                09065369929 (call/whatsapp)
              </Button>
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<CallOutlined />}
              >
                08087164862
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup
              size="large"
              variant="contained"
              orientation="vertical"
              fullWidth
              color="primary"
            >
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<EmailOutlined />}
              >
                info@naijagoingabroad.com
              </Button>
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<HouseOutlined />}
              >
                65c Opebi Rd, Ikeja, Lagos
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
