// @ts-nocheck
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import vetcountries from "./vetcountries";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { startCase } from "lodash";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { useSnackbar } from "notistack";

const styles = makeStyles((theme) => ({
  emailInput: {
    color: "#ffffff",
  },
  focusedForm: { borderColor: "#ffffff" },
  emailLabel: {
    padding: "5px",
    color: "#000000",
  },
  emailunshrink: {
    color: "#ffffff",
  },
  emailoutline: {
    borderColor: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));
const VisaEligibilityComponent = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const getIncomeText = (income) => {
    switch (income) {
      case 25:
        return "between NGN 100,000 - NGN 199,000";
        break;
      case 35:
        return "between NGN 200,000 - NGN 299,000";
        break;
      case 45:
        return "between NGN 300,000 - NGN 399,000";
        break;
      case 50:
        return "between NGN 400,000 +";
        break;
      default:
        return "";
        break;
    }
  };

  const onSubmit = (data) => {
    setSubmitted(true);

    let ageScore = 0;
    let travelPurposeBonus = 0; //bonus for invitation letter
    let studyAgeBonus = 0;
    let studyFundBonus = 0;
    let childrenBonus = 0;
    let countryBonus = 0;

    if (
      data.country === "Egypt" ||
      data.country === "Ethiopia" ||
      data.country === "South Africa" ||
      data.country === "Tunisia"
    ) {
      countryBonus = 25;
    } else if (data.country === "Kenya" || data.country === "Tanzania") {
      countryBonus = 50;
    }

    if (travelPurpose === "Tourism or Vacation") {
      if (data.age <= 30) {
        ageScore = 0;
      } else if (data.age >= 31 && data.age <= 40) {
        ageScore = 5;
      } else if (data.age >= 41 && data.age <= 50) {
        ageScore = 10;
      } else if (data.age >= 51) {
        ageScore = 15;
      }
    }
    if (
      travelPurpose === "Visiting family or friend" ||
      travelPurpose === "Attending a business meeting"
    ) {
      travelPurposeBonus = 20;
    }
    if (travelPurpose === "Attending a conference/event") {
      travelPurposeBonus = 10;
    }
    if (travelPurpose === "To study at undergraduate/masters level") {
      travelPurposeBonus = 35;
    }
    if (
      travelPurpose === "To study at undergraduate/masters level" &&
      data.level === "undergraduate" &&
      data.age <= 22
    ) {
      studyAgeBonus = 10;
    }
    if (data.sponsorFunds === "5") {
      studyFundBonus = 20;
    } else if (data.sponsorFunds === "10") {
      studyFundBonus = 30;
    } else if (data.sponsorFunds === "15") {
      studyFundBonus = 40;
    } else if (data.sponsorFunds === "20") {
      studyFundBonus = 50;
    }
    if (data.children > 0) {
      childrenBonus = 5;
    }

    let maritalStatus = data.maritalStatus ? data.maritalStatus : 0;
    let income = data.income ? data.income : 0;
    let landedProps = data.landedProps ? data.landedProps : 0;

    const totalScore =
      ageScore +
      Number(maritalStatus) +
      childrenBonus +
      Number(income) +
      Number(landedProps) +
      travelPurposeBonus +
      studyAgeBonus +
      studyFundBonus +
      countryBonus;

    setIncome(income);
    setCountry(data.country);
    setTotalScore(totalScore);
    setSponsorFunds(data.sponsorFunds);
    setState(data);
  };

  const [state, setState] = useState("");

  const router = useRouter();
  const query = router.query;
  const [travelPurpose, setTravelPurpose] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const age = Array.from({ length: 100 }, (_, i) => ({ age: `${i + 15}` }));
  const children = Array.from({ length: 10 }, (_, i) => ({
    child: `${i}`,
  }));
  const [travelerAge, setAge] = useState("");
  const [childrenState, setChild] = useState(0);
  const [income, setIncome] = useState("");
  const [sponsorFunds, setSponsorFunds] = useState("");
  const [landedProps, setLandedProps] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isloading, setLoading] = useState(false);
  const classes = styles();

  const handleTravelPurpose = (event) => {
    if (travelPurpose) {
      router
        .push(`/visa-eligibility-test/?travelPurpose=${event.target.value}`)
        .then(() => {
          router.reload();
        });
    } else {
      setTravelPurpose(event.target.value);
    }
  };

  const theme = useTheme();
  const xsDevices = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    if (query.travelPurpose) {
      setTravelPurpose(query.travelPurpose);
    }
  });

  useEffect(() => {}, [
    travelPurpose,
    maritalStatus,
    travelerAge,
    childrenState,
    income,
    sponsorFunds,
    landedProps,
    country,
    level,
  ]);

  return (
    <Box my={3} pb={5}>
      <Box pb={3}>
        <Typography gutterBottom variant="h4" component="h2">
          Thinking of applying for a visa soon ???
        </Typography>
        <Typography gutterBottom>
          Please provide your details below to get evaluated instantly
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} component={Paper}>
          <Grid item xs={12}>
            <FormControl
              //  error={errors.travelPurpose ? true : false}
              fullWidth
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Purpose of Travel
              </InputLabel>
              <Select
                disabled={submitted}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={travelPurpose}
                onChange={handleTravelPurpose}
                label="Purpose of Travel"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Tourism or Vacation">
                  Tourism or Vacation
                </MenuItem>
                <MenuItem value="Visiting family or friend">
                  Visiting family or friend
                </MenuItem>
                <MenuItem value="Attending a business meeting">
                  Attending a business meeting
                </MenuItem>
                <MenuItem value="Attending a conference/event">
                  Attending a conference/event
                </MenuItem>
                <MenuItem value="To study at undergraduate/masters level">
                  To Study at undergraduate or masters level
                </MenuItem>
              </Select>
              {!travelPurpose && submitted && (
                <FormHelperText error>
                  Please select your purpose of travel
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              disabled={submitted}
              id="combo-box-demo"
              options={vetcountries}
              getOptionLabel={(option) => {
                return option.countryName;
              }}
              // style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="What is your destination country"
                  variant="outlined"
                  inputRef={register}
                  name="country"
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disabled={submitted}
              id="combo-box-demo3"
              options={age}
              getOptionLabel={(option) => option.age}
              // style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={xsDevices ? "Age" : "What is your age (years)"}
                  variant="outlined"
                  inputRef={register}
                  name="age"
                  required
                />
              )}
            />
          </Grid>
          {travelPurpose &&
            travelPurpose !== "To study at undergraduate/masters level" && (
              <Grid item xs={8}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label2">
                    Marital Status
                  </InputLabel>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    defaultValue=""
                    name="maritalStatus"
                    as={
                      <Select
                        disabled={submitted}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined2"
                        value={maritalStatus}
                        //  onChange={handleMaritalStatus}
                        label="Marital Status"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Single</MenuItem>
                        <MenuItem value={5}>Married</MenuItem>
                      </Select>
                    }
                  />
                  {errors.maritalStatus?.type === "required" && (
                    <FormHelperText error>
                      Please select your marital status
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
          {travelPurpose &&
            travelPurpose !== "To study at undergraduate/masters level" && (
              <Grid item xs={4}>
                <Autocomplete
                  disabled={submitted}
                  id="combo-box-demo2"
                  options={children}
                  getOptionLabel={(option) => option.child}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        xsDevices ? "Child" : "How many children do you have"
                      }
                      variant="outlined"
                      inputRef={register}
                      name="children"
                      required
                    />
                  )}
                />
              </Grid>
            )}
          {travelPurpose &&
            travelPurpose !== "To study at undergraduate/masters level" && (
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label2">
                    What is your monthly income
                  </InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="income"
                    rules={{ required: true }}
                    as={
                      <Select
                        disabled={submitted}
                        labelId="demo-simple-select-outlined-label2"
                        id="demo-simple-select-outlined2"
                        value={income}
                        //  onChange={handleIncome}
                        label="Purpose of Travel"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={25}>
                          between &#8358;100,000 - &#8358;199,000
                        </MenuItem>
                        <MenuItem value={35}>
                          between &#8358;200,000 - &#8358;299,000
                        </MenuItem>
                        <MenuItem value={45}>
                          between &#8358;300,000 - &#8358;399,000
                        </MenuItem>
                        <MenuItem value={50}>between &#8358;400,000 +</MenuItem>
                      </Select>
                    }
                  />
                  {errors.income?.type === "required" && (
                    <FormHelperText error>
                      Please select your monthly income range
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
          {travelPurpose &&
            travelPurpose === "To study at undergraduate/masters level" && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label4">
                    Level of study
                  </InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="level"
                    rules={{ required: true }}
                    as={
                      <Select
                        disabled={submitted}
                        labelId="demo-simple-select-outlined-label4"
                        id="demo-simple-select-outlined4"
                        value={level}
                        //   onChange={handleLevelOfStudy}
                        label="Purpose of Travel"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="undergraduate">
                          Undergraduated Study
                        </MenuItem>
                        <MenuItem value="postgraduate">
                          Postgraduated Study
                        </MenuItem>
                      </Select>
                    }
                  />
                  {errors.level?.type === "required" && (
                    <FormHelperText error>
                      Please select your monthly income range
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
          {travelPurpose &&
            travelPurpose === "To study at undergraduate/masters level" && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label3">
                    Available balance in sponsor's or self account
                  </InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="sponsorFunds"
                    rules={{ required: true }}
                    as={
                      <Select
                        disabled={submitted}
                        labelId="demo-simple-select-outlined-label3"
                        id="demo-simple-select-outlined3"
                        value={sponsorFunds}
                        //    onChange={handleSponsorFunds}
                        label="Available balance in sponsor's or self account"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="5">about &#8358;5,000,000</MenuItem>
                        <MenuItem value="10">about &#8358;10,000,000</MenuItem>
                        <MenuItem value="15">about &#8358;15,000,000</MenuItem>
                        <MenuItem value="20">
                          about &#8358;20,000,000 or more
                        </MenuItem>
                      </Select>
                    }
                  />
                  {errors.sponsorFunds?.type === "required" && (
                    <FormHelperText error>
                      Please select the average funds in the sponsor's account
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
          {travelPurpose &&
            travelPurpose !== "To study at undergraduate/masters level" && (
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label4">
                    Do you have landed property/investments
                  </InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    name="landedProps"
                    as={
                      <Select
                        disabled={submitted}
                        labelId="demo-simple-select-outlined-label4"
                        id="demo-simple-select-outlined4"
                        value={landedProps}
                        //    onChange={handleLandedProps}
                        label="Purpose of Travel"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>YES</MenuItem>
                        <MenuItem value={0}>NO</MenuItem>
                      </Select>
                    }
                  />
                  {errors.landedProps?.type === "required" && (
                    <FormHelperText error>
                      Please answer the question
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid
            item
            // xs={12}
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
            }}
            container
          >
            <List
              subheader={
                <Typography>
                  {travelPurpose && "Mandatory Checklist"}
                </Typography>
              }
              component="nav"
              aria-label="main mailbox folders"
            >
              {travelPurpose &&
                submitted &&
                country &&
                travelPurpose !== "To study at undergraduate/masters level" &&
                travelPurpose !== "Tourism or Vacation" && (
                  <ListItem button>
                    <ListItemIcon>
                      <BeenhereIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`You have selected ${travelPurpose} as your purpose of trip. We will assume that you have, or intend to get, an invitation letter from your host in ${country}`}
                    />
                  </ListItem>
                )}
              {travelPurpose &&
                submitted &&
                country &&
                travelPurpose === "To study at undergraduate/masters level" && (
                  <ListItem button>
                    <ListItemIcon>
                      <BeenhereIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`You have selected study as your purpose of trip. We will assume that you have, or intend to get, an offer letter from your academic instituion in ${country}. Your offer letter is the primary document for this category of visa.`}
                    />
                  </ListItem>
                )}
              {travelPurpose &&
                submitted &&
                income &&
                travelPurpose !== "To study at undergraduate/masters level" && (
                  <ListItem button>
                    <ListItemIcon>
                      <BeenhereIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`You have stated that your monthly income is ${getIncomeText(
                        income
                      )}, it is your responsibility to ensure that you submit clear evidence of this fact to the consular`}
                    />
                  </ListItem>
                )}
              {travelPurpose &&
                submitted &&
                sponsorFunds &&
                travelPurpose === "To study at undergraduate/masters level" && (
                  <ListItem button>
                    <ListItemIcon>
                      <BeenhereIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`You have selected study as your purpose of trip and said you will be providing a proof of fund of ${sponsorFunds}, it is your responsiblity to ensure that you submit clear evidence of relationship with the sponsor, exception is when you are sponsoring yourself`}
                    />
                  </ListItem>
                )}
            </List>
            <Grid
              style={{ paddingTop: "20px" }}
              item
              spacing={5}
              container
              justify="space-between"
            >
              <Grid
                xs={12}
                sm={6}
                item
                //  style={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                <TextField
                  disabled={submitted}
                  required
                  id="fullname"
                  label="Full Name"
                  variant="outlined"
                  inputRef={register}
                  name="fullName"
                  value={fullName}
                  onChange={(event) => setName(event.target.value)}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.emailoutline,
                      input: classes.emailInput,
                      focused: classes.focusedForm,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      shrink: classes.emailLabel,
                      outlined: classes.emailunshrink,
                    },
                    style: { color: "#ffffff" },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                item
                //  style={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                <TextField
                  disabled={submitted}
                  required
                  inputRef={register}
                  name="email"
                  helperText={
                    <span style={{ color: "white" }}>
                      Your result will be sent to this email
                    </span>
                  }
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  InputProps={{
                    // inputProps: { classes: { input: classes.emailInput } },
                    classes: {
                      notchedOutline: classes.emailoutline,
                      input: classes.emailInput,
                      focused: classes.focusedForm,
                      root: classes.focusedForm,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      shrink: classes.emailLabel,
                      outlined: classes.emailunshrink,
                    },
                    style: { color: "#ffffff" },
                  }}
                  fullWidth
                />
              </Grid>
              {!submitted ? (
                <Grid item xs={12}>
                  <Button
                    style={{ height: "50px" }}
                    size="large"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Done
                  </Button>
                </Grid>
              ) : (
                <Grid item container spacing={4}>
                  <Grid item xs={6}>
                    <Button
                      style={{ height: "50px" }}
                      size="large"
                      variant="contained"
                      fullWidth
                      startIcon={<AutorenewIcon />}
                      onClick={() =>
                        router
                          .push("/visa-eligibility-test")
                          .then((res) => router.reload())
                      }
                    >
                      Restart
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {isloading ? (
                      <Button
                        style={{ height: "50px" }}
                        size="large"
                        variant="contained"
                        fullWidth
                        startIcon={<DoneAllIcon />}
                      >
                        DONE
                      </Button>
                    ) : (
                      <Button
                        style={{ height: "50px" }}
                        size="large"
                        variant="contained"
                        fullWidth
                        startIcon={<SendIcon />}
                        onClick={() => {
                          let outputScore = totalScore < 100 ? totalScore : 97;
                          axios
                            .post(
                              "https://hook.integromat.com/fla45dwj8d263q63lu5x8d903xbxsye8",
                              {
                                totalScore: outputScore,
                                name: startCase(
                                  state.fullName.toLocaleLowerCase()
                                ),
                                country: startCase(state.country.toUpperCase()),
                                email: state.email,
                              }
                            )
                            .then((res) => {
                              setLoading(true);
                              enqueueSnackbar(
                                "Congratulations!!! Your result has been sent to your email",
                                {
                                  variant: "success",
                                  autoHideDuration: 30000000,
                                  anchorOrigin: {
                                    horizontal: "center",
                                    vertical: "bottom",
                                  },
                                  content: (
                                    <Alert
                                      onClose={() => {
                                        closeSnackbar();
                                      }}
                                      component={Paper}
                                      severity="success"
                                    >
                                      Congratulations!!! Your result has been
                                      sent to your email
                                    </Alert>
                                  ),
                                }
                              );
                            })
                            .catch((error) => {
                              enqueueSnackbar(
                                "something went wrong, please refresh the page and try again",
                                {
                                  variant: "error",
                                  autoHideDuration: 30000,
                                }
                              );
                            });
                        }}
                      >
                        Send
                      </Button>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default VisaEligibilityComponent;
