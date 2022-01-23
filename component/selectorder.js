import {
  Autocomplete,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { formatter } from "./utilityfx";
import QuizIcon from "@mui/icons-material/Quiz";
import { Controller, useForm, useFormContext } from "react-hook-form";
import {
  countries,
  insuranceDuration,
  nonSchenghenPrice,
  schenghenPrice,
} from "./insuranceprice";
import React from "react";

export default function SelectOrder() {
  const {
    handleSubmit,
    watch,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [insurancePrice, setInsurancePrice] = React.useState(0);

  const getInsurancePrice = () => {
    if (!watch("insuranceCountry") || !watch("insuranceDuration")) {
      return 0;
    } else if (watch("insuranceCountry").isSchengen) {
      return schenghenPrice[watch("insuranceDuration").duration];
    } else if (!watch("insuranceCountry").isSchengen) {
      return nonSchenghenPrice[watch("insuranceDuration").duration];
    } else {
      return 0;
    }
  };

  React.useEffect(() => {
    register("insurancePrice");

    if (watch("travelInsurance")) {
      setInsurancePrice(getInsurancePrice());
      setValue("insurancePrice", getInsurancePrice());
    } else {
      setInsurancePrice(0);
      setValue("insurancePrice", 0);
    }
  }, [
    watch("insuranceCountry")?.countryName,
    watch("travelInsurance"),
    watch("insuranceDuration")?.duration,
  ]);

  return (
    <Stack
      divider={<Divider orientation="horizontal" flexItem />}
      sx={{ my: 3, px: 1 }}
      spacing={2}
      // component="form"
      // onSubmit={handleSubmit(handleNext)}
    >
      <Controller
        name="hotelReservation"
        defaultValue={false}
        control={control}
        render={(data) => {
          const { value, onChange } = data;
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              component={Paper}
              variant="outlined"
              sx={{ p: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label={
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                  >
                    <Typography>
                      Hotel Reservation For Visa Application
                    </Typography>
                    <IconButton color="primary">
                      <QuizIcon />
                    </IconButton>
                  </Stack>
                }
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {formatter.format(5000)}
              </Typography>
            </Stack>
          );
        }}
      />

      <Controller
        name="flightReservation"
        defaultValue={false}
        control={control}
        render={(data) => {
          const { value, onChange } = data;
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              component={Paper}
              variant="outlined"
              sx={{ p: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label={
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                  >
                    <Typography>
                      Flight Reservation For Visa Application
                    </Typography>
                    <IconButton color="primary">
                      <QuizIcon />
                    </IconButton>
                  </Stack>
                }
              />
              <Typography sx={{ fontWeight: "bold" }}>Free</Typography>
            </Stack>
          );
        }}
      />

      <Controller
        name="travelInsurance"
        defaultValue={false}
        control={control}
        render={(data) => {
          const { value, onChange } = data;
          return (
            <Stack
              sx={{ p: 2 }}
              spacing={1}
              component={Paper}
              variant="outlined"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  }
                  label={
                    <Stack
                      justifyContent="space-between"
                      alignItems="center"
                      direction="row"
                    >
                      <Typography>Travel Insurance</Typography>
                      <IconButton color="primary">
                        <QuizIcon />
                      </IconButton>
                    </Stack>
                  }
                />
                <Typography sx={{ fontWeight: "bold" }}>
                  {formatter.format(insurancePrice)}
                </Typography>
              </Stack>
              <Collapse in={Boolean(watch("travelInsurance"))}>
                <Stack direction="row" spacing={2}>
                  <Controller
                    name="insuranceCountry"
                    defaultValue=""
                    control={control}
                    render={(data) => {
                      const { value, onChange } = data;
                      return (
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={countries}
                          getOptionLabel={(option) => option.countryName}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label={
                                getValues("insuranceCountry")?.countryName
                                  ? getValues("insuranceCountry")?.countryName
                                  : "Select Country"
                              }
                            />
                          )}
                          onChange={(e, v, r) => {
                            if (r === "selectOption") onChange(v);
                          }}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="insuranceDuration"
                    defaultValue=""
                    control={control}
                    render={({ value, onChange }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={insuranceDuration}
                        getOptionLabel={(option) => option.duration}
                        onChange={(e, v, r) => {
                          if (r === "selectOption") onChange(v);
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            {...params}
                            label={
                              getValues("insuranceDuration")?.duration
                                ? getValues("insuranceDuration")?.duration
                                : "Select Duration"
                            }
                          />
                        )}
                      />
                    )}
                  />
                </Stack>
              </Collapse>
            </Stack>
          );
        }}
      />

      <Controller
        name="visaForm"
        defaultValue={false}
        control={control}
        render={(data) => {
          const { value, onChange } = data;
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              component={Paper}
              variant="outlined"
              sx={{ p: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label={
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                  >
                    <Typography>Visa Application Form Filling</Typography>
                    <IconButton color="primary">
                      <QuizIcon />
                    </IconButton>
                  </Stack>
                }
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {formatter.format(10000)}
              </Typography>
            </Stack>
          );
        }}
      />

      <Controller
        name="coverLetter"
        defaultValue={false}
        control={control}
        render={(data) => {
          const { value, onChange } = data;
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              component={Paper}
              variant="outlined"
              sx={{ p: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label={
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                  >
                    <Typography>Cover Letter</Typography>
                    <IconButton color="primary">
                      <QuizIcon />
                    </IconButton>
                  </Stack>
                }
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {formatter.format(10000)}
              </Typography>
            </Stack>
          );
        }}
      />
    </Stack>
  );
}
