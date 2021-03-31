import {
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AttachMoneyOutlined,
  CheckCircleOutlineSharp,
  EmailOutlined,
  ErrorOutlineOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { formatMoney } from "./utilityfx";

const styles = makeStyles((theme) => ({
  error: {
    marginLeft: "10px",
    backgroundColor: theme.palette.error.light,
    color: theme.palette.text.primary,
  },
  errorIcon: {},
  bank: {
    paddingLeft: "50px",
  },
}));

const PayOnlineButton = (props) => {
  const {
    onSuccess,
    onClose,
    config,
    total,
    paymentOption,
    paymentStatus,
  } = props;
  const initializePayment = usePaystackPayment(config);
  useEffect(() => {
    if (
      window !== undefined &&
      paymentOption === "Online Debit/Credit Card Payment" &&
      paymentStatus === false
    ) {
      console.log(paymentStatus, paymentOption);

      setTimeout(() => {
        window.document.getElementById("pay").click();
      }, 5000);
    }
  }, [null]);
  return (
    <Button
      variant="contained"
      color="primary"
      id="pay"
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
    >
      PAY ONLINE | &#8358; {total}
    </Button>
  );
};

const OrderSuccess = () => {
  const classes = styles();
  const [state, setState] = useState(null);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (window !== undefined) {
      const session = JSON.parse(window.sessionStorage.getItem("orderkeys"));
      if (session) {
        setState(session);
      } else {
        enqueueSnackbar("sorry, no order found in your browser history", {
          variant: "error",
        });
        enqueueSnackbar("redirecting to the order page", { variant: "error" });
        router.push("/interactive-order-platform");
      }
    }
  }, []);

  if (!state) return <>Loading..</>;

  const {
    insurAmount,
    hotelAmount,
    flightAmount,
    freeFlight,
    coverAmount,
    formAmount,
    orderId,
    firstName,
    appointment,
    consultation,
    checklist,
    email,
    total,
    paymentStatus,
    paymentOption,
  } = state;

  const config = {
    reference: new Date().getTime(),
    email: email,
    amount: total + "00",
    publicKey: "pk_live_15139c6c99cb881d8487bf68ef2011aa225d26f4",
  };

  const onPaymentSuccess = (reference) => {
    console.log(reference);
    const session = JSON.parse(window.sessionStorage.getItem("orderkeys"));
    const updateSession = { ...session, paymentStatus: true };
    window.sessionStorage.setItem("orderkeys", JSON.stringify(updateSession));
    setState(updateSession);
  };

  const onClose = () => {
    console.log("closed");
  };
  return (
    <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Grid container justify="center">
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          <Alert icon={<EmailOutlined />} closeText="close" severity="success">
            Booking confirmation has been sent to {email}
          </Alert>
          {paymentStatus && (
            <Alert
              icon={<AttachMoneyOutlined />}
              closeText="close"
              severity="success"
            >
              Payment confirmation has been sent to {email}
            </Alert>
          )}
        </Grid>
        <Grid item container xs={12} sm={6}>
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            style={{ marginBottom: "30px" }}
          >
            <Grid item>
              <Typography>Dear {firstName}</Typography>
            </Grid>
            {!paymentStatus && (
              <Grid item>
                <PayOnlineButton
                  onSuccess={onPaymentSuccess}
                  onClose={onClose}
                  config={config}
                  total={total}
                  paymentStatus={paymentStatus}
                  paymentOption={paymentOption}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>
              Order ID: <strong>{orderId}</strong>, has been submitted for the
              following items:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {flightAmount > 0 || freeFlight === true ? (
              <Alert severity="success">Flight Reservation For Visa</Alert>
            ) : (
              ""
            )}
            {hotelAmount > 0 && (
              <Alert severity="success">Hotel Reservation For Visa</Alert>
            )}
            {insurAmount > 0 && (
              <Alert severity="success">Travel Health Insurance</Alert>
            )}
            {coverAmount > 0 && (
              <Alert severity="success">Cover Letter Requested</Alert>
            )}
            {formAmount > 0 && (
              <Alert severity="success">
                Application Form Filling Services
              </Alert>
            )}
            {appointment && (
              <Alert severity="success">Appointment Booking Services</Alert>
            )}
            {checklist && <Alert severity="success">Documents Checklist</Alert>}
            {consultation && (
              <Alert severity="success">Consultaion Services</Alert>
            )}
            {paymentStatus ? (
              <Alert severity="success">Payment Received</Alert>
            ) : (
              <Alert severity="error">Payment Pending</Alert>
            )}
          </Grid>
          {!paymentStatus && (
            <Grid item xs={12} className={classes.bank}>
              <Typography>Bank Transfer</Typography>
              <Typography>Bank: Stanbic Ibtc</Typography>
              <Typography>A/c: 0034136686</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {paymentStatus ? (
            <img src="images/ordersuccess.svg" width="100%" height="300px" />
          ) : (
            <img src="images/paymentwaiting.svg" width="100%" height="300px" />
          )}
        </Grid>
        <Grid item xs={12}>
          <Box pl={5} mt={2}>
            <Typography variant="h6">Total: {formatMoney(total)}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderSuccess;
