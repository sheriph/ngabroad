import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import top100Films from "./movies";

const styles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: "20px",
    marginBottom: "30px",
  },
}));

const Order = () => {
  const classes = styles();
  const [expandHotel, setExpandHotel] = useState(false);
  const [expandInsurance, setExpandInsurance] = useState(false);
  const [expandFlight, setExpandFlight] = useState(false);
  const [expandFormFilling, setExpandFormFilling] = useState(false);

  const [expanded, setExpanded] = useState("");
  const [orderItem, setOrderItem] = useState({
    insurance: false,
    hotel: false,
    flight: false,
    form: false,
    cover: false,
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
    return newOrderItem;
  };

  return (
    <Grid
      justify="center"
      container
      spacing={3}
      className={classes.gridContainer}
      component={Container}
    >
      <Grid item xs={12}>
        <Accordion
          component="div"
          expanded={expanded === "insurance"}
          onChange={() => handChange("insurance")}
        >
          <AccordionSummary
            component="div"
            expandIcon={
              <ExpandMore
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if ("insurance" === expanded) {
                    setExpanded("");
                  } else {
                    setExpanded("insurance");
                  }
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={12} sm>
                <Typography gutterBottom>Travel Insurance</Typography>
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
                    }, 1500);
                  }}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>
              <Grid item xs sm="auto">
                <Typography display="inline" variant="button" color="primary">
                  &#8358; 26,520
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
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Destination Country"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm>
                  <Autocomplete
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Insurance Duration"
                        variant="outlined"
                      />
                    )}
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
        >
          <AccordionSummary
            component="div"
            expandIcon={
              <ExpandMore
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if ("hotel" === expanded) {
                    setExpanded("");
                  } else {
                    setExpanded("hotel");
                  }
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Hotel Reservation For Visa</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion
          component="div"
          expanded={expanded === "flight"}
          onChange={() => handChange("flight")}
        >
          <AccordionSummary
            component="div"
            expandIcon={
              <ExpandMore
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if ("flight" === expanded) {
                    setExpanded("");
                  } else {
                    setExpanded("flight");
                  }
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Flight Reservation For Visa</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion
          component="div"
          expanded={expanded === "form"}
          onChange={() => handChange("form")}
        >
          <AccordionSummary
            component="div"
            expandIcon={
              <ExpandMore
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if ("form" === expanded) {
                    setExpanded("");
                  } else {
                    setExpanded("form");
                  }
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Application Form Filling</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion
          component="div"
          expanded={expanded === "letter"}
          onChange={() => handChange("letter")}
        >
          <AccordionSummary
            component="div"
            expandIcon={
              <ExpandMore
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if ("letter" === expanded) {
                    setExpanded("");
                  } else {
                    setExpanded("letter");
                  }
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Cover Letter</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion
          component="div"
          expanded={expanded === "done"}
          onChange={() => handChange("done")}
        >
          <AccordionSummary
            component="div"
            expandIcon={
              <ExpandMore
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if ("done" === expanded) {
                    setExpanded("");
                  } else {
                    setExpanded("done");
                  }
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Complete Order</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Order;
