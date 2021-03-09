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
  CheckCircleOutlineSharp,
  ErrorOutlineOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";

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
  const { onSuccess, onClose, config, total } = props;
  const initializePayment = usePaystackPayment(config);
  return (
    <Button
      variant="contained"
      color="primary"
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
  const [paymentDone, setPayment] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (window !== undefined) {
      setState(JSON.parse(window.sessionStorage.getItem("orderkeys")));
    }
  }, [null]);

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
  } = state;

  const config = {
    reference: new Date().getTime(),
    email: email,
    amount: total,
    publicKey: "pk_test_272253f0c5a6b45e540df35be4fc30f101088e14",
  };

  const onPaymentSuccess = (reference) => {
    console.log(reference);
  };
  const onClose = () => {
    console.log("closed");
  };
  return (
    <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Grid container justify="center">
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
            {!paymentDone && (
              <Grid item>
                <PayOnlineButton
                  onSuccess={onPaymentSuccess}
                  onClose={onClose}
                  config={config}
                  total={total}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>
              Order ID: <strong>{orderId}</strong>, has been completed with the
              following details:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {flightAmount > 0 ||
              (freeFlight && (
                <Alert severity="success">Flight Reservation For Visa</Alert>
              ))}
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
            {paymentDone ? (
              <Alert severity="success">Payment Received</Alert>
            ) : (
              <Alert severity="error">Payment Pending</Alert>
            )}
          </Grid>
          {!paymentDone && (
            <Grid item xs={12} className={classes.bank}>
              <Typography>Bank Transfer</Typography>
              <Typography>Bank: Stanbic Ibtc</Typography>
              <Typography>A/c: 0034136686</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {paymentDone ? (
            <img src="images/ordersuccess.svg" width="100%" height="300px" />
          ) : (
            <img src="images/paymentwaiting.svg" width="100%" height="300px" />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderSuccess;
