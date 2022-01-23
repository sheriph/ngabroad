import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  Divider,
  Stack,
  StepContent,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import SelectOrder from "./selectorder";
import OrderDetails from "./orderdetails";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { customerInfo_, formData_, orderData_ } from "../state/recoil";
import OrderComplete from "./ordercomplete";
import { formatter } from "./utilityfx";
import axios from "axios";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import MyBackdrop from "./backdrop";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { lowerCase, startCase } from "lodash";

const orderSchema = yup.object().shape({
  /* Email: yup.string().email(),
  Surname: yup.string(),
  "First Name": yup.string(),
  Telephone: yup.number(), */
});

const steps = ["Select Order", "Order Details", "Complete Order"];

export default function Order() {
  const [activeStep, setActiveStep] = React.useState(0);
  const methods = useForm({
    resolver: yupResolver(orderSchema),
  });
  const [formData, setFormData] = useRecoilState(formData_);
  const [orderData, setOrderData] = useRecoilState(orderData_);
  const [customerInfo, setCustomerInfo] = useRecoilState(customerInfo_);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const router = useRouter();
  const {
    query: { orderNumber },
  } = router;


  const getOrder = async (orderNumber) => {
    setLoading(true);
    try {
      const order = await toast.promise(
        axios.post("/api/getorder", { orderNumber }),
        {
          pending: "Retrieving Your Order ...",
          success: "Order retrieved successfully",
          error: "Order could not be retrieved",
        }
      );
      const { customerInfo, orderData, formData } = order.data;
      methods.register("totalPrice");
      methods.setValue("totalPrice", formData.totalPrice);
      setCustomerInfo(customerInfo);
      setOrderData(orderData);
      setFormData(formData);
      setActiveStep(2);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (orderNumber) {
      getOrder(orderNumber);
    }
  }, [orderNumber]);

  const onSubmit = async (data) => {
    switch (activeStep) {
      case 0:
        methods.register("totalPrice");
        const hotelPrice = data.hotelReservation ? 5000 : 0;
        const flightPrice = data.flightReservation ? 5000 : 0;
        const insurancePrice = data.insurancePrice ? data.insurancePrice : 0;
        const formFillingPrice = data.visaForm ? 10000 : 0;
        const coverLetterPrice = data.coverLetter ? 10000 : 0;
        const totalPrice =
          hotelPrice +
          flightPrice +
          insurancePrice +
          formFillingPrice +
          coverLetterPrice;
        methods.setValue("totalPrice", totalPrice);
        // setFormData(methods.getValues());
        setOrderData(methods.getValues());
        if (data.travelInsurance) {
          if (!data.insuranceCountry?.countryName) {
            toast.error("Please provide country for insurance item");
            return;
          }
          if (!data.insuranceDuration?.duration) {
            toast.error("Please provide insurance duration");
            return;
          }
        }
        handleNext();
        break;
      case 1:
        const orderNumber = Math.random().toString(36).slice(6).toUpperCase();
        const allData = { ...orderData, ...data, orderNumber };
        const orderUrl = `https://naijagoingabroad.com/interactive-order-platform?orderNumber=${orderNumber}`;
        const templateParams = {
          to_email: data.Email,
          orderNumber: orderNumber,
          orderUrl: orderUrl,
          totalPrice: formatter.format(orderData.totalPrice),
          to_name: startCase(
            lowerCase(`${data.Surname} ${data["First Name"]}`)
          ),
        };
        try {
          const processOrder = await toast.promise(
            axios
              .post("/api/createorder", {
                formData: allData,
                orderData,
                customerInfo: data,
              })
              .then(async (response) => {
                await toast.promise(
                  emailjs.send(
                    process.env.NEXT_PUBLIC_SERVICE_ID,
                    process.env.NEXT_PUBLIC_TEMPLATE_ID_ORDER_FORM,
                    templateParams,
                    process.env.NEXT_PUBLIC_EMAILJS_USER_ID
                  ),
                  {
                    pending: "Sending Order Confirmation Email ...",
                    success: "Confirmation Email Sent Successfully",
                    error:
                      "Sending Confirmation Email Failed, Please note that your order number has this order has been confirmed",
                  }
                );
              })
              .catch((error) => {
                console.log("email sending error", error);
              }),
            {
              pending: "Submitting Order",
              error: "Error occurred while creating order",
              success: "Order successfully created",
            }
          );

          setFormData(allData);
          methods.reset(allData);
          setCustomerInfo(data);
          handleNext();
        } catch (error) {
          console.log("error", error);
        }

        break;
      default:
        console.log("nothing");
        break;
    }
  };

  const handleNext = () => {
    if (activeStep !== steps.length)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const mobile = useMediaQuery("(max-width:600px)");

  const getOrderStageJsx = (activeStep) => {
    switch (activeStep) {
      case 0:
        return <SelectOrder />;
      case 1:
        return <OrderDetails />;
      case 2:
        return <OrderComplete />;
      default:
        return <></>;
    }
  };
  return (
    <FormProvider {...methods}>
      <MyBackdrop open={loading} />

      <Stack
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ py: 3, my: 2 }}
      >
        <Stack sx={{ mb: 4 }} spacing={2}>
          <Typography textAlign="center">Retreive Existing Order</Typography>
          <Stack justifyContent="center" direction="row" spacing={2}>
            <TextField
              size="small"
              id="outlined-name"
              label="Enter Your Order Number"
              value={value}
              onChange={handleChange}
            />
            <Button
              onClick={() => getOrder(value)}
              variant="contained"
              size="small"
              startIcon={<SearchIcon />}
              disabled={value.length !== 7}
            >
              Search
            </Button>
          </Stack>
        </Stack>
        <Stepper
          orientation={mobile ? "vertical" : "horizontal"}
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            return (
              <Step last={false} key={label}>
                <StepLabel>{label}</StepLabel>
                {mobile && (
                  <StepContent>
                    <Stack
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      {getOrderStageJsx(index)}
                      <Stack
                        justifyContent="space-between"
                        spacing={5}
                        direction="row"
                      >
                        <Button
                          disabled={activeStep === 0 || activeStep === 2}
                          onClick={handleBack}
                          variant="outlined"
                        >
                          BACK
                        </Button>
                        {activeStep > 0 && (
                          <Box
                            sx={{
                              py: 1,
                              px: 2,
                              color: "white",
                              backgroundColor: "primary.main",
                            }}
                            component={Typography}
                          >
                            {formatter.format(methods.watch("totalPrice"))}
                          </Box>
                        )}
                        {activeStep === 2 ? (
                          <Box></Box>
                        ) : (
                          <Button type="submit" variant="outlined">
                            {activeStep === 1 ? "SUBMIT" : "CONTINUE"}
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </StepContent>
                )}
              </Step>
            );
          })}
        </Stepper>

        <Box>
          {!mobile && (
            <Stack>
              {getOrderStageJsx(activeStep)}
              <Stack justifyContent="space-between" spacing={5} direction="row">
                <Button
                  disabled={activeStep === 0 || activeStep === 2}
                  onClick={handleBack}
                  variant="outlined"
                >
                  BACK
                </Button>
                {activeStep > 0 && (
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      color: "white",
                      backgroundColor: "primary.main",
                    }}
                    component={Typography}
                  >
                    {formatter.format(methods.watch("totalPrice"))}
                  </Box>
                )}
                {activeStep === 2 ? (
                  <Box></Box>
                ) : (
                  <Button type="submit" variant="outlined">
                    {activeStep === 1 ? "SUBMIT" : "CONTINUE"}
                  </Button>
                )}
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
    </FormProvider>
  );
}
