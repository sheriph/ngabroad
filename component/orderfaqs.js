import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  createTheme,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { adaptV4Theme } from '@mui/material/styles';
import {
  BookmarkBorderOutlined,
  CloseRounded,
  DateRangeOutlined,
  LocalLibraryOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Alert} from "@mui/lab";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player/youtube";
import { makeStyles } from "@mui/styles";

const theme = createTheme(adaptV4Theme({}));
const styles = makeStyles(() => ({
  box: {
    width: "80%",
    [theme.breakpoints.down('md')]: { width: "100%" },
  },
}));

export const InsuranceFaqs = ({ setOpenModal }) => {
  // const theme = useTheme();

  const classes = styles();

  return (
    <Box
      sx={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Travel Insurance
      </Typography>
      <Typography>
        Our travel health Insurance is a piece of e-documents issued by one of
        our insurance partners namely; <br />
        <ul>
          <li>Axa Mansard </li>
          <li>Mutual Benefits Assurance Plc </li>
        </ul>
        This documents is required by various embassies and airlines to fulfil
        an obligation. It is also required before you can submit any schengen
        visa application.
        <br />
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>Minimum coverage of 30,000 euros</li>
          <li>Instant certificates</li>
          <li>International Acceptance accross all embassies and airlines</li>
          <li>Global Partnerships</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const HotelFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      sx={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Hotel Reservation For Visa services
      </Typography>
      <Typography>
        Hotel reservation for visa is a piece of documents issued by an hotel
        which confirms that an accomodation has been reserved in the name of the
        recipient. This is required by most embassies as a requirement for visa
        application.
        <strong>
          Note that you are not required to pay upfront for hotel accomodation
          as the outcome of visa in most instances are not guarnateed,
          therefore, no embassy as ever requested for a paid hotel except in
          some instances when visa is about to be approved and the applicant was
          specifically called to bring a paid hotel
        </strong>
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>Valid and verifiable by the embassy or the applicant</li>
          <li>
            Full contact details of the issuing hotel which can be used by
            either the embassy or the applicant to verify its authenticity
          </li>
          <li>Instant confirmation</li>
          <li>International Acceptance accross all embassies and airlines</li>
          <li>Global Partnerships</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const FlightFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      sx={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Flight Reservation For Visa services
      </Typography>
      <Typography>
        Flight reservation for visa is a piece of documents issued by an airline
        which confirms the itinerary of the traveller. This is needed by most
        embassies as a requirement for visa application. This service is free
        when you have purchased another item.
        <strong>
          Note that you are not required to pay upfront for flight booking when
          applying for visa as the outcome of visa in most instances are not
          guarnateed, therefore, no embassy as ever requested for a paid flight
          itinerary except in some instances when visa is about to be approved
          and the applicant was specifically called to bring a paid flight
          booking. Also, this confirmation sent to you is an itinerary which can
          be verified on the airline's website usually within 72 hours. Beyond
          this period, it may not be valid. However, embassy do not need a valid
          itinerary to issue
        </strong>
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>issued by the airline</li>
          <li>Instant confirmation</li>
          <li>International Acceptance accross all embassies</li>
          <li>Global Partnerships</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
      <Typography>
        This service is free if you have purchase other items, if not, please
        select the paid version of this item
      </Typography>
    </Box>
  );
};

export const FormFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      sx={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Visa Application Form Filling Services
      </Typography>
      <Typography>
        With the help of this services, a proffesional visa expert will assist
        you in filling your application form to ensure it has no errors and meet
        the specifications of the embassy requirements.
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>Form will be fill by a proffesional visa expert</li>
          <li>Advise on documentations for visa</li>
          <li>
            Review by applicant before submission to ensure that your profile
            has been properly entered
          </li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const CoverFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      sx={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Cover Letter
      </Typography>
      <Typography>
        With this product, you will receive a proffesionally crafted embassy
        standard cover letter for your visa application. If you do not know what
        a cover letter for visa is, then you should know that it is a letter
        written in support of your application detailing additional information
        about your social ties, economic ties, travel plans etc. These
        information assist the consular officer in visa decision.
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>
            Cover Letter will be written following the best guidelines that work
            for your specific visa category and profile.
          </li>
          <li>Advise on documentations for visa</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const LoadingScreen = ({ setOpenModal }) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size="150px" color="secondary" />
      <Typography
        variant="caption"
        style={{ position: "absolute", color: "white" }}
      >
        Please wait...
      </Typography>
    </Box>
  );
};

export const FreeGiftsFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      sx={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        FREE GIFTS
      </Typography>

      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>
            Flight Reservation For Visa: This is required by embassies to
            understand your planned itinerary
          </li>
          <li>
            Documents Checklist: This is a detailed list of visa requirements
            that you are expected to bring in order to successfully lodge your
            application
          </li>
          <li>
            Appointment Booking: Many embassies have an appointment booking
            system and you are expected to schedule and appointment before
            coming for submission
          </li>
          <li>
            Consultaion Services: Would you like to talk to an expert on how to
            acheive success with your visa application? If so, this service is
            available for you for free. <br />
            **minimum order of NGN 10,000 mandatory
          </li>
        </ul>
      </Typography>
    </Box>
  );
};

export const SchoolDetails = ({ setOpenModal, school }) => {
  const theme = useTheme();
  const classes = styles();
  const [showForm, setForm] = useState(false);
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [gender, setGender] = useState("Select Gender");
  const [dob, handleDob] = useState(new Date());
  const [isloading, setIsLoading] = useState(false);

  const {
    applicationFee,
    country,
    description,
    selection6: durationLevel,
    level: field,
    location,
    selection4_name: title,
    selection5: tuitionFee,
    uni_contact,
    uni_image: logo,
    uni_name,
  } = school;

  const [isFormSubmitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    const userData = { ...data, ...school };
    console.log(userData);
    axios
      .post(
        "https://hook.integromat.com/pn4i5kl4vr8pwr3eopu56x12n2mifog5",
        userData
      )
      .then((response) => {
        console.log(response);
        setSubmitted(true);
        setForm(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <Box
      sx={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
        <Button
          onClick={() => setForm(true)}
          size="small"
          color="primary"
          variant="contained"
          disabled={isFormSubmitted}
        >
          {isFormSubmitted ? "Info Requested" : "Request More Info"}
        </Button>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            {title} <br /> {uni_name}
          </Typography>
        </Grid>
        {showForm && !isFormSubmitted ? (
          <Grid
            item
            container
            spacing={2}
            xs={12}
            style={{
              //  backgroundColor: theme.palette.primary.main,
              //  color: theme.palette.getContrastText(theme.palette.primary.main),
              marginTop: "10px",
              marginBottom: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "10px",
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid item xs={12}>
              <Typography gutterBottom align="center">
                Information Request Form
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                name="surname"
                fullWidth
                label="Surname"
                variant="outlined"
                required
                disabled={isFormSubmitted}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                name="othername"
                fullWidth
                label="Other Names"
                variant="outlined"
                required
                disabled={isFormSubmitted}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                name="email"
                fullWidth
                label="Email"
                variant="outlined"
                required
                disabled={isFormSubmitted}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                name="phone"
                fullWidth
                label="Contact Phone"
                variant="outlined"
                required
                disabled={isFormSubmitted}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-select-currency"
                select
                label="Select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                //helperText="Gender"
                variant="outlined"
                inputRef={register}
                name="gender"
                disabled={isFormSubmitted}
              >
                {["Select Gender", "MALE", "FEMALE"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputRef={register}
                    // @ts-ignore
                    name="dob"
                    value={dob}
                    onChange={handleDob}
                    format="MMMM Do YYYY"
                    //  variant = "inline"
                    //  InputAdornmentProps={{ position: "start" }}
                    inputVariant="outlined"
                    // component={InputBase}
                    color="primary"
                    InputProps={{
                      startAdornment: (
                        <DateRangeOutlined
                          color="primary"
                          style={{ marginRight: "10px" }}
                        />
                      ),
                    }}

                    // startIcon={<DateRangeOutlined />}
                    //.MuiInputBase-input
                  />
                </LocalizationProvider>
              </FormControl> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-static"
                label="AddItional Info"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                inputRef={register}
                name="addInfo"
                disabled={isFormSubmitted}
                helperText="Please tell us about your highest level of education, any previous visa refusal, your budget on tuition, and any other useful information. We will get back to you for further discussion"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isloading}
                variant="contained"
                color="primary"
                type="submit"
                startIcon={
                  isloading ? <CircularProgress color="primary" /> : ""
                }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              marginTop: "10px",
              marginBottom: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography align="center">
              Why you should apply to {uni_name} via NGabroad:
            </Typography>
            <ul>
              <li>Free admission support services</li>
              <li>Free visa support services</li>
              <li>99.9% success rate assured for eligible applicants</li>
            </ul>
          </Grid>
        )}
        {isFormSubmitted && (
          <Grid item xs={12}>
            <Alert severity="success">
              Thank you !!. Your request has been submitted. You should receive
              a feedback within the next 24 hours.
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          {description && (
            <>
              <Typography gutterBottom align="center">
                Program Overview
              </Typography>
              <>{description}</>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          {uni_contact && (
            <>
              <Typography gutterBottom align="center">
                Institution Information
              </Typography>
              <>{uni_contact}</>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export const SchoolDetails2 = ({ setOpenModal, school }) => {
  const classes = styles();

  useEffect(() => {
    try {
      window.document.querySelector(".ielts")?.remove();
    } catch (e) {
      console.log(e);
    }
  }, [null]);

  let {
    admissionRequirements,
    career,
    content,
    description,
    duration,
    field,
    level,
    location,
    logo,
    outcome,
    programUrl,
    scholarship,
    subject,
    title,
    tuition,
    uniName,
    video,
    delivery,
  } = school;

  try {
    admissionRequirements = admissionRequirements.replace(
      `""ielts""`,
      `"ielts"`
    );
  } catch (e) {
    console.log(e);
  }
  // console.log("admissionRequirements", { admissionRequirements });
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: "10px",
        width: "80%",
        maxHeight: "100%",
        overflowY: "scroll",
      }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
        {programUrl && (
          <Button
            onClick={() => window.open(programUrl)}
            size="small"
            color="primary"
            variant="contained"
          >
            Visit School Page
          </Button>
        )}
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            {title} <br /> {uniName}
          </Typography>
        </Grid>

        <Grid item xs={12} container>
          {level && (
            <Grid item>
              <ButtonBase
                centerRipple
                style={{ textTransform: "none" }}
                component={Button}
                startIcon={<LocalLibraryOutlined color="primary" />}
              >
                {level}
              </ButtonBase>
            </Grid>
          )}
          {duration && (
            <Grid item>
              <ButtonBase
                centerRipple
                style={{ textTransform: "none" }}
                component={Button}
                startIcon={<BookmarkBorderOutlined color="primary" />}
              >
                {duration}
              </ButtonBase>
            </Grid>
          )}

          {field && (
            <Grid item>
              <ButtonBase
                centerRipple
                style={{ textTransform: "none" }}
                component={Button}
                startIcon={<LocationOnOutlined color="primary" />}
              >
                ${field} | ${subject || ""}
              </ButtonBase>
            </Grid>
          )}

          {location && (
            <Grid item>
              <ButtonBase
                centerRipple
                style={{ textTransform: "none" }}
                component={Button}
                startIcon={<LocationOnOutlined color="primary" />}
              >
                {location}
              </ButtonBase>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12}>
          {description && (
            <Box dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </Grid>

        <Grid item xs={12}>
          {content && <Box dangerouslySetInnerHTML={{ __html: content }} />}
        </Grid>

        <Grid item xs={12}>
          {career && <Box dangerouslySetInnerHTML={{ __html: career }} />}
        </Grid>

        <Grid item xs={12}>
          {outcome && <Box dangerouslySetInnerHTML={{ __html: outcome }} />}
        </Grid>

        <Grid item xs={12}>
          {admissionRequirements && (
            <Box dangerouslySetInnerHTML={{ __html: admissionRequirements }} />
          )}
        </Grid>
        <Grid item xs={12}>
          {tuition && <Box dangerouslySetInnerHTML={{ __html: tuition }} />}
        </Grid>

        <Grid item xs={12}>
          {scholarship && (
            <Box dangerouslySetInnerHTML={{ __html: scholarship }} />
          )}
        </Grid>

        <Grid item xs={12}>
          <ReactPlayer url={video} />
        </Grid>
      </Grid>
    </Box>
  );
};
