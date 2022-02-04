import {
  Button,
  ButtonGroup,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CallOutlined,
  EmailOutlined,
  HouseOutlined,
} from "@mui/icons-material";
import { Alert } from "@mui/lab";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

const contactSchema = yup.object().shape({
  from_email: yup.string().email(),
});

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });
  const [isFormSubmitted, setSubmitted] = useState(false);
  const [isloading, setLoading] = useState(false);
  const theme = useTheme();
  const styles = makeStyles(() => ({
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
  const classes = styles();

  const onSubmit = async (data) => {
    console.log(data);
    const { from_name, from_email, from_tel, message } = data;
    setLoading(true);
    const templateParams = {
      from_name: from_name,
      from_email: from_email,
      from_tel: from_tel,
      message: message,
    };
    try {
      await toast.promise(
        emailjs.send(
          process.env.NEXT_PUBLIC_SERVICE_ID,
          process.env.NEXT_PUBLIC_TEMPLATE_ID_CONTACT_FORM,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        ),
        {
          pending: "Sending Email To Support ...",
          success: "Success. You should get a feedback soon",
          error: "Sending Failed, Please try again",
        }
      );
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const { from_email: emailError } = errors;

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
          <Grid container justifyContent="center">
            <Grid item>
              <img
                src="/images/mailsent.svg"
                alt="mailsent"
                width="100%"
                height="100px"
              />
            </Grid>
            <Grid item>
              <Alert
                classes={{
                  icon: classes.alertIcon,
                }}
                className={classes.alert}
              >
                Your email has been sent. We will get back to you soon.
              </Alert>
            </Grid>
          </Grid>
        ) : (
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            container
            spacing={2}
          >
            <Grid sx={{ height: "auto" }} item xs={12}>
              <TextField
                inputRef={register}
                name="from_name"
                fullWidth
                label="Your Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="from_email"
                required
                fullWidth
                label="Your Email"
                variant="outlined"
                error={Boolean(emailError)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="from_tel"
                fullWidth
                label="Your Telephone Number"
                variant="outlined"
                required
                type="number"
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
                required
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
