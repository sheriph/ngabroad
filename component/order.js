// @ts-nocheck
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputBase,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { DateRangeOutlined, ExpandMore, HelpSharp } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useDocument } from "@nandorojo/swr-firestore";
import React, { useEffect, useState } from "react";
import top100Films from "./movies";
import {
  insurancePrice,
  insuranceDuration,
  countries,
  schenghenPrice,
  nonSchenghenPrice,
} from "./insuranceprice";
import { Controller, useForm } from "react-hook-form";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import OrderModal from "./ordermodal";
import {
  CoverFaqs,
  FlightFaqs,
  FormFaqs,
  FreeGiftsFaqs,
  HotelFaqs,
  InsuranceFaqs,
  LoadingScreen,
} from "./orderfaqs";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import axios from "axios";
import { formatMoney } from "./utilityfx";
//import DateFnsUtils from "@date-io/date-fns";

const styles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: "20px",
    marginBottom: "30px",
  },
  outlinedInputRoot: {
    // borderColor: "white",
    borderWidth: "0",
  },
  adornedEnd: {
    paddingRight: "0",
  },
  datePicker: {
    backgroundColor: theme.palette.primary.main,
    width: "180px",
    paddingRight: "5px",
    paddingLeft: "5px",
    color: theme.palette.getContrastText(theme.palette.primary.main),
    height: "50px",
    fontSize: theme.typography.caption,
    borderRadius: "5px",
    // width: "fit-content",
  },
  FormControlAdorment: {
    flexDirection: "row",
  },
}));
const Order = () => {
  const classes = styles();
  const [insurAmount, setInsurAmount] = useState(0);
  const [insurCountry, setInsurCountry] = useState(null);
  const [insurDuration, setInsurDuration] = useState(null);
  const [hotelAmount, setHotelAmount] = useState(0);
  const [freeFlight, setFreeFlight] = useState(false);
  const [checklist, setChecklist] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [consultation, setConsultation] = useState(false);
  const [flightAmount, setFlightAmount] = useState(0);
  const [formAmount, setFormAmount] = useState(0);
  const [coverAmount, setCoverAmount] = useState(0);
  const [depDate, handleDepDate] = useState(new Date());
  const [retDate, handleRetDate] = useState(new Date());
  const [dob, handleDob] = useState(new Date());
  const [gender, setGender] = useState("Select Gender");
  const [openModal, setOpenModal] = useState(false);
  const [paymentOption, setPayment] = React.useState(
    "Online Debit/Credit Card Payment"
  );
  const [isBooking, setIsBooking] = useState(false);
  const { data, error } = useDocument("orderItem/insurance", {
    listen: true,
  });

  const total =
    insurAmount + hotelAmount + flightAmount + formAmount + coverAmount;

  const [expanded, setExpanded] = useState("");
  const [orderItem, setOrderItem] = useState({
    insurance: false,
    hotel: false,
    flight: false,
    form: false,
    cover: false,
    gifts: false,
  });
  const [loading, setLoading] = useState(false);

  const handChange = (value) => {
    setExpanded(value);
  };

  let updateOrderItem = (value) => {
    let newOrderItem = { ...orderItem };
    for (let item in orderItem) {
      if (value === item) {
        newOrderItem[item] = !newOrderItem[item];
      }
    }
    console.log(newOrderItem);
    return newOrderItem;
  };
  const { register, handleSubmit, watch, errors, control } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const onSubmit = (data) => {
    if (total === 0) {
      console.log("empty cart");
      enqueueSnackbar("Your Cart is empty", { variant: "error" });
      if (freeFlight)
        enqueueSnackbar(
          "This product is only free if you purchase another paid item, otherwise, please select the NGN 5,000 flight reservation option",
          { variant: "error" }
        );
      setIsBooking(false);
      return;
    }
    const order1 =
      flightAmount > 0 || freeFlight === true
        ? "Flight Reservation For Visa"
        : "";

    const order2 = hotelAmount > 0 ? "Hotel Reservation For Visa" : "";
    const order3 =
      insurAmount > 0
        ? `Travel Health Reservation: ${insurCountry} ${insurDuration}`
        : "";
    const order4 = coverAmount > 0 ? "Cover Letter Request" : "";
    const order5 = formAmount > 0 ? "Application Formn Filling Service" : "";
    const order6 = appointment === true ? "Appointment Booking Services" : "";
    const order7 = checklist === true ? "Documents Checklist" : "";
    const order8 = consultation === true ? "Consultation Services" : "";

    const customerData = {
      ...data,
      insurAmount,
      insurCountry,
      insurDuration,
      hotelAmount,
      freeFlight,
      formAmount,
      coverAmount,
      coverAmount,
      flightAmount,
      appointment,
      consultation,
      checklist,
      total,
      paymentOption,
      paymentStatus: false,
      orderId: Math.floor(Math.random() * 1000 + 1000),
      order1,
      order2,
      order3,
      order4,
      order5,
      order6,
      order7,
      order8,
    };
    console.log(customerData);
    window.sessionStorage.setItem("orderkeys", JSON.stringify(customerData));
    axios
      .post(
        "https://hook.integromat.com/ma139mrhh9s8zxe2p5cx46a8lbdr1nln",
        customerData
      )
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          setIsBooking(false);
        }, 2500);
        setTimeout(() => {
          router.push("/congratulations-order-completed");
        }, 3000);
      })
      .catch((error) => console.log(error));
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  useEffect(() => {});
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        justify="center"
        container
        spacing={3}
        className={classes.gridContainer}
        //   component={Container}
      >
        <Grid item xs={12}>
          <Accordion
            component="div"
            expanded={expanded === "gifts"}
            onChange={() => handChange("gifts")}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component="div"
              expandIcon={
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if ("gifts" === expanded) {
                      setExpanded("");
                    } else {
                      setExpanded("gifts");
                    }
                  }}
                >
                  <ExpandMore />
                </Box>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm>
                  <Typography gutterBottom variant="button">
                    FREE GIFTS
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Typography align="center" gutterBottom>
                    These services are free provided you buy another product(s)
                    below. Cheers!!
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container alignItems="center">
                  <Grid item>
                    <Checkbox
                      color="primary"
                      checked={freeFlight}
                      onChange={() => setFreeFlight(!freeFlight)}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="button">
                      FREE FLIGHT RESERVATION FOR VISA
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container alignItems="center">
                  <Grid item>
                    <Checkbox
                      color="primary"
                      checked={checklist}
                      onChange={() => setChecklist(!checklist)}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="button">
                      FREE DOCUMENTS CHECKLIST
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container alignItems="center">
                  <Grid item>
                    <Checkbox
                      color="primary"
                      checked={appointment}
                      onChange={() => setAppointment(!appointment)}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="button">
                      FREE APPOINTMENT BOOKING IF NEEDED
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container alignItems="center">
                  <Grid item>
                    <Checkbox
                      color="primary"
                      checked={consultation}
                      onChange={() => setConsultation(!consultation)}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="button">
                      FREE VISA CONSULTATION
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      size="large"
                      endIcon={<HelpSharp color="primary" />}
                      style={{ textTransform: "none" }}
                      onClick={() => setOpenModal(true)}
                    >
                      ABOUT FREE GIFT
                    </Button>
                  </Box>
                  <OrderModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    jsx={<FreeGiftsFaqs setOpenModal={setOpenModal} />}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            component="div"
            expanded={expanded === "insurance"}
            onChange={() => handChange("insurance")}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component="div"
              expandIcon={
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if ("insurance" === expanded) {
                      setExpanded("");
                    } else {
                      setExpanded("insurance");
                    }
                  }}
                >
                  <ExpandMore />
                </Box>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm>
                  <Typography gutterBottom variant="button">
                    Travel Insurance
                  </Typography>
                </Grid>
                <Grid item xs sm>
                  <Switch
                    color="primary"
                    value="insurance"
                    checked={orderItem.insurance}
                    onChange={(e) => {
                      setLoading(true);
                      setTimeout(() => {
                        setOrderItem(updateOrderItem(e.target.value));
                        setLoading(false);
                        setInsurAmount(0);
                      }, 1500);
                    }}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item xs sm="auto">
                  <Typography display="inline" variant="button" color="primary">
                    {formatMoney(insurAmount)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {loading && (
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <CircularProgress color="primary" />
                  </Grid>
                </Grid>
              )}
              {!orderItem.insurance && !loading && (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography align="center">
                      To Order For a Travel Insurance, Please enable insurance
                      button above
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {orderItem.insurance && !loading && (
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12} sm>
                    <Autocomplete
                      options={countries}
                      getOptionLabel={(option) => option.countryName}
                      style={{ width: "100%" }}
                      onChange={(e, v, l) => {
                        if (!v) return;
                        setInsurCountry(v.countryName);
                        if (insurDuration) {
                          if (v.isShenghen) {
                            const amount = schenghenPrice[insurDuration];
                            setInsurAmount(amount);
                          } else {
                            const amount = nonSchenghenPrice[insurDuration];
                            setInsurAmount(amount);
                          }
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Destination Country"
                          variant="outlined"
                          inputRef={register}
                          name="insuranceCountry"
                          helperText={
                            insurCountry ? `Current Value: ${insurCountry}` : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <Autocomplete
                      options={insuranceDuration}
                      getOptionLabel={(option) => option.duration}
                      style={{ width: "100%" }}
                      onChange={(e, v, l) => {
                        if (!v) return;
                        setInsurDuration(v.duration);
                        if (insurCountry) {
                          const countryObj = countries.filter(
                            (country) => country.countryName === insurCountry
                          );
                          if (countryObj.isShenghen) {
                            const amount = schenghenPrice[v.duration];
                            setInsurAmount(amount);
                          } else {
                            const amount = nonSchenghenPrice[v.duration];
                            setInsurAmount(amount);
                          }
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Insurance Duration"
                          variant="outlined"
                          inputRef={register}
                          name="insuranceDuration"
                          helperText={
                            insurDuration
                              ? `Current Value: ${insurDuration}`
                              : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        size="large"
                        endIcon={<HelpSharp color="primary" />}
                        style={{ textTransform: "none" }}
                        onClick={() => setOpenModal(true)}
                      >
                        Travel Health Insurance
                      </Button>
                    </Box>
                    <OrderModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      jsx={<InsuranceFaqs setOpenModal={setOpenModal} />}
                    />
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            component="div"
            expanded={expanded === "hotel"}
            onChange={() => handChange("hotel")}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component="div"
              expandIcon={
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if ("hotel" === expanded) {
                      setExpanded("");
                    } else {
                      setExpanded("hotel");
                    }
                  }}
                >
                  <ExpandMore />
                </Box>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm>
                  <Typography gutterBottom variant="button">
                    Hotel Reservation For Visa
                  </Typography>
                </Grid>
                <Grid item xs sm>
                  <Switch
                    color="primary"
                    value="hotel"
                    checked={orderItem.hotel}
                    onChange={(e) => {
                      setLoading(true);
                      setTimeout(() => {
                        setOrderItem(updateOrderItem(e.target.value));
                        setLoading(false);
                        setHotelAmount(0);
                      }, 1500);
                    }}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item xs sm="auto">
                  <Typography display="inline" variant="button" color="primary">
                    {formatMoney(hotelAmount)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {loading && (
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <CircularProgress color="primary" />
                  </Grid>
                </Grid>
              )}
              {!orderItem.hotel && !loading && (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography align="center">
                      To Order For our
                      <strong> hotel reservation for visa</strong> aplication,
                      Please enable button above
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {orderItem.hotel && !loading && (
                <Grid container justify="center" spacing={2}>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <Checkbox
                        color="primary"
                        onChange={() =>
                          setHotelAmount((prev) => {
                            if (prev === 0) {
                              setHotelAmount(5000);
                            } else {
                              setHotelAmount(0);
                            }
                          })
                        }
                        checked={hotelAmount !== 0}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="button">
                        Hotel Reservation For Visa
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        size="large"
                        endIcon={<HelpSharp color="primary" />}
                        style={{ textTransform: "none" }}
                        onClick={() => setOpenModal(true)}
                      >
                        Hotel Reservation For Visa
                      </Button>
                    </Box>
                    <OrderModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      jsx={<HotelFaqs setOpenModal={setOpenModal} />}
                    />
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            component="div"
            expanded={expanded === "flight"}
            onChange={() => handChange("flight")}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component="div"
              expandIcon={
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if ("flight" === expanded) {
                      setExpanded("");
                    } else {
                      setExpanded("flight");
                    }
                  }}
                >
                  <ExpandMore />
                </Box>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm>
                  <Typography gutterBottom variant="button">
                    Flight Reservation For Visa
                  </Typography>
                </Grid>
                <Grid item xs sm>
                  <Switch
                    color="primary"
                    value="flight"
                    checked={orderItem.flight}
                    onChange={(e) => {
                      setLoading(true);
                      setTimeout(() => {
                        setOrderItem(updateOrderItem(e.target.value));
                        setLoading(false);
                        setFlightAmount(0);
                        setFreeFlight(false);
                      }, 1500);
                    }}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item xs sm="auto">
                  <Typography display="inline" variant="button" color="primary">
                    {formatMoney(flightAmount)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {loading && (
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <CircularProgress color="primary" />
                  </Grid>
                </Grid>
              )}
              {!orderItem.flight && !loading && (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography align="center">
                      To Order For our
                      <strong> Flight reservation for visa</strong> aplication,
                      Please enable button above
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {orderItem.flight && !loading && (
                <Grid container justify="center" spacing={2}>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <Checkbox
                        color="primary"
                        onChange={() =>
                          setFlightAmount((prev) => {
                            if (prev === 0) {
                              return 5000;
                            } else {
                              return 0;
                            }
                          })
                        }
                        checked={flightAmount !== 0}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="button">
                        Flight Reservation For Visa
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        size="large"
                        endIcon={<HelpSharp color="primary" />}
                        style={{ textTransform: "none" }}
                        onClick={() => setOpenModal(true)}
                      >
                        Flight Reservation For Visa
                      </Button>
                    </Box>
                    <OrderModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      jsx={<FlightFaqs setOpenModal={setOpenModal} />}
                    />
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            component="div"
            expanded={expanded === "form"}
            onChange={() => handChange("form")}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component="div"
              expandIcon={
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if ("form" === expanded) {
                      setExpanded("");
                    } else {
                      setExpanded("form");
                    }
                  }}
                >
                  <ExpandMore />
                </Box>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm>
                  <Typography gutterBottom variant="button">
                    Application Form Filling
                  </Typography>
                </Grid>
                <Grid item xs sm>
                  <Switch
                    color="primary"
                    value="form"
                    checked={orderItem.form}
                    onChange={(e) => {
                      setLoading(true);
                      setTimeout(() => {
                        setOrderItem(updateOrderItem(e.target.value));
                        setLoading(false);
                      }, 1500);
                    }}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item xs sm="auto">
                  <Typography display="inline" variant="button" color="primary">
                    {formatMoney(formAmount)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {loading && (
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <CircularProgress color="primary" />
                  </Grid>
                </Grid>
              )}
              {!orderItem.form && !loading && (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography align="center">
                      To Order For our
                      <strong> Application Form Filling Services</strong>,
                      Please enable button above
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {orderItem.form && !loading && (
                <Grid container justify="center" spacing={2}>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <Checkbox
                        color="primary"
                        onChange={() =>
                          setFormAmount((prev) => {
                            if (prev === 0) {
                              return 10000;
                            } else {
                              return 0;
                            }
                          })
                        }
                        checked={formAmount !== 0}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="button">
                        Application form filling Services
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography>
                        ** You will be contacted for additional information
                      </Typography>
                      <Button
                        size="large"
                        endIcon={<HelpSharp color="primary" />}
                        style={{ textTransform: "none" }}
                        onClick={() => setOpenModal(true)}
                      >
                        Form Filling Services
                      </Button>
                    </Box>
                    <OrderModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      jsx={<FormFaqs setOpenModal={setOpenModal} />}
                    />
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            component="div"
            expanded={expanded === "letter"}
            onChange={() => handChange("letter")}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component="div"
              expandIcon={
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if ("letter" === expanded) {
                      setExpanded("");
                    } else {
                      setExpanded("letter");
                    }
                  }}
                >
                  <ExpandMore />
                </Box>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm>
                  <Typography gutterBottom variant="button">
                    Cover Letter
                  </Typography>
                </Grid>
                <Grid item xs sm>
                  <Switch
                    color="primary"
                    value="cover"
                    checked={orderItem.cover}
                    onChange={(e) => {
                      setLoading(true);
                      setTimeout(() => {
                        setOrderItem(updateOrderItem(e.target.value));
                        setLoading(false);
                        setCoverAmount(0);
                      }, 1500);
                    }}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item xs sm="auto">
                  <Typography display="inline" variant="button" color="primary">
                    {formatMoney(coverAmount)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {loading && (
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <CircularProgress color="primary" />
                  </Grid>
                </Grid>
              )}
              {!orderItem.cover && !loading && (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography align="center">
                      To Order For our
                      <strong> Cover letter services</strong>, Please enable the
                      button above
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {orderItem.cover && !loading && (
                <Grid container justify="center" spacing={2}>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <Checkbox
                        color="primary"
                        onChange={() =>
                          setCoverAmount((prev) => {
                            if (prev === 0) {
                              return 5000;
                            } else {
                              return 0;
                            }
                          })
                        }
                        checked={coverAmount !== 0}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="button">Cover Letter</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography>
                        ** You will be contacted for additional information
                      </Typography>
                      <Button
                        size="large"
                        endIcon={<HelpSharp color="primary" />}
                        style={{ textTransform: "none" }}
                        onClick={() => setOpenModal(true)}
                      >
                        Cover Letter
                      </Button>
                    </Box>
                    <OrderModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      jsx={<CoverFaqs setOpenModal={setOpenModal} />}
                    />
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion
            component="div"
            expanded={expanded === "done"}
            onChange={() => handChange("done")}
            //  TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component="div"
              expandIcon={
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if ("done" === expanded) {
                      setExpanded("");
                    } else {
                      setExpanded("done");
                    }
                  }}
                >
                  <ExpandMore />
                </Box>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography gutterBottom variant="button">
                    Complete Your Order
                  </Typography>
                </Grid>
                <Grid item>{formatMoney(total)}</Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container justify="center">
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <Typography gutterBottom align="center">
                    Kindly complete the form below to confirm your order
                  </Typography>
                </Grid>
                <Grid item container justify="center" spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={register}
                      name="surname"
                      fullWidth
                      label="Surname"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      inputRef={register}
                      name="firstName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      inputRef={register}
                      name="telephone"
                      helperText="enter the phone number for communication with us. If you are not the applicant, provide the applicant's number in the additional info"
                      fullWidth
                      label="Telephone"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      inputRef={register}
                      name="email"
                      fullWidth
                      label="Email"
                      helperText="enter the email for communication with us. If you are not the applicant, provide the applicant's email in the additional info"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      inputRef={register}
                      name="address"
                      fullWidth
                      label="Address"
                      variant="outlined"
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
                    >
                      {["Select Gender", "MALE", "FEMALE"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Passport Number"
                      variant="outlined"
                      inputRef={register}
                      name="passport"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                          inputRef={register}
                          label ="Date of Birth"
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
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid item container xs={12} sm={6}>
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        label="Departure City & Date Select"
                        variant="outlined"
                        placeholder="e.g Lagos"
                        inputRef={register}
                        name="depCity"
                        // component="div"
                        InputProps={{
                          endAdornment: (
                            <FormControl
                              classes={{ root: classes.FormControlAdorment }}
                            >
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                  inputRef={register}
                                  name="depDate"
                                  value={depDate}
                                  onChange={handleDepDate}
                                  format="D/MM/YY"
                                  //  variant = "inline"
                                  //  InputAdornmentProps={{ position: "start" }}
                                  inputVariant="outlined"
                                  // component={InputBase}
                                  color="secondary"
                                  classes={{
                                    input: classes.outlinedInputRoot,
                                  }}
                                  TextFieldComponent={InputBase}
                                  className={classes.datePicker}
                                  startAdornment={
                                    <DateRangeOutlined fontSize="small" />
                                  }
                                  // startIcon={<DateRangeOutlined />}
                                  //.MuiInputBase-input
                                />
                              </MuiPickersUtilsProvider>
                            </FormControl>
                          ),
                          classes: { adornedEnd: classes.adornedEnd },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} sm={6}>
                    <Grid item>
                      <TextField
                        required
                        inputRef={register}
                        name="retCity"
                        fullWidth
                        label="Return City & Date Select"
                        variant="outlined"
                        placeholder="e.g London"
                        // component="div"
                        InputProps={{
                          endAdornment: (
                            <FormControl
                              classes={{ root: classes.FormControlAdorment }}
                            >
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                  inputRef={register}
                                  name="retDate"
                                  value={retDate}
                                  onChange={handleRetDate}
                                  format="D/MM/YY"
                                  //  variant = "inline"
                                  //  InputAdornmentProps={{ position: "start" }}
                                  inputVariant="outlined"
                                  // component={InputBase}
                                  color="secondary"
                                  classes={{
                                    input: classes.outlinedInputRoot,
                                  }}
                                  TextFieldComponent={InputBase}
                                  className={classes.datePicker}
                                  startAdornment={
                                    <DateRangeOutlined fontSize="small" />
                                  }
                                  // startIcon={<DateRangeOutlined />}
                                  //.MuiInputBase-input
                                />
                              </MuiPickersUtilsProvider>
                            </FormControl>
                          ),
                          classes: { adornedEnd: classes.adornedEnd },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" gutterBottom>
                      Are you an agent and want to provide your contact details
                      for feedback ? <br />
                      Are you ordering for our hotel reservation for visa but
                      needs a specifically named hotel ? <br />
                      Are you making order for a family and needs to provide
                      names of other family members ? <br />
                      Or you would like to give us any other information just to
                      ensure we serve you right ? <br />
                    </Typography>
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
                      helperText="Optional Field"
                    />
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    justify="space-between"
                    item
                    xs={12}
                  >
                    <Grid item>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          Select Your prefered payment method
                        </FormLabel>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          defaultValue="Online Debit/Credit Card Payment"
                          name="payment"
                          as={
                            <RadioGroup
                              aria-label="Select Your prefered payment method"
                              name="payment"
                              value={paymentOption}
                              onChange={handlePayment}
                              inputRef={register}
                            >
                              <FormControlLabel
                                value="Bank Transfer"
                                control={<Radio />}
                                label="Bank Transfer"
                              />
                              <FormControlLabel
                                value="Online Debit/Credit Card Payment"
                                control={<Radio />}
                                label="Online Debit/Credit Card Payment"
                              />
                            </RadioGroup>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => {
                          setIsBooking(true);
                        }}
                        color="primary"
                        type="submit"
                        variant="contained"
                      >
                        Confirm Order
                      </Button>
                      <OrderModal
                        openModal={isBooking}
                        setOpenModal={setIsBooking}
                        jsx={<LoadingScreen setOpenModal={setIsBooking} />}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </form>
  );
};

export default Order;
