import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { formData_, orderData_ } from "../state/recoil";
import MyCustomDatePicker from "./datepicker";

export default function OrderDetails() {
  const {
    handleSubmit,
    watch,
    register,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useFormContext();
  const [formData, setFormData] = useRecoilState(formData_);
  const [orderData, setOrderData] = useRecoilState(orderData_);

  React.useEffect(() => {
    reset(orderData);
  }, [null]);

  const mobile = useMediaQuery("(max-width:600px)");
  const titles = ["Mr", "Mrs", "Ms"];
  return (
    <Stack>
      <Stack spacing={2} sx={{ py: 3, my: 2 }}>
        <Stack spacing={2} sx={{ p: 2 }} component={Paper} variant="outlined">
          <Typography align="center" gutterBottom>
            General Information
          </Typography>
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Controller
              name="Surname"
              defaultValue=""
              control={control}
              render={({ value, onChange }) => (
                <TextField
                  required
                  fullWidth
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <Controller
              name="First Name"
              defaultValue=""
              control={control}
              render={({ value, onChange }) => (
                <TextField
                  fullWidth
                  required
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </Stack>
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Controller
              name="Telephone"
              defaultValue=""
              control={control}
              render={({ value, onChange }) => (
                <TextField
                  fullWidth
                  required
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  id="outlined-basic"
                  label="Telephone"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <Controller
              name="Email"
              defaultValue=""
              control={control}
              render={({ value, onChange }) => (
                <TextField
                  required
                  type="email"
                  fullWidth
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </Stack>
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Controller
              name="Title"
              defaultValue=""
              control={control}
              render={({ value, onChange }) => (
                <TextField
                  id="outlined-select-currency"
                  select
                  required
                  fullWidth
                  size="small"
                  label="Title"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                >
                  {titles.map((title, index) => (
                    <MenuItem key={index} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="Passport Number"
              defaultValue=""
              control={control}
              render={({ value, onChange }) => (
                <TextField
                  fullWidth
                  required
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  id="outlined-basic"
                  label="Passport Number"
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </Stack>
        </Stack>

        {watch("travelInsurance") && (
          <Stack spacing={2} sx={{ p: 2 }} component={Paper} variant="outlined">
            <Typography align="center" gutterBottom>
              Travel Insurance
            </Typography>
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
              <Controller
                name="Insurance Start Date"
                defaultValue={new Date()}
                control={control}
                render={({ value, onChange }) => (
                  <MyCustomDatePicker
                    value={value}
                    onChange={onChange}
                    label="Insurance Start Date"
                  />
                )}
              />
              <Controller
                name="Your Date Of Birth"
                defaultValue={new Date()}
                control={control}
                render={({ value, onChange }) => (
                  <MyCustomDatePicker
                    value={value}
                    onChange={onChange}
                    label="Your Date Of Birth"
                  />
                )}
              />
            </Stack>
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
              <Controller
                name="Home Address"
                defaultValue=""
                control={control}
                render={({ value, onChange }) => (
                  <TextField
                    fullWidth
                    required
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    id="outlined-basic"
                    label="Home Address"
                    variant="outlined"
                    placeholder="65c Opebi Rd, Ikeja, Lagos"
                    size="small"
                  />
                )}
              />
              <Box sx={{ width: "100%" }}></Box>
            </Stack>
          </Stack>
        )}

        {watch("hotelReservation") && (
          <Stack spacing={2} sx={{ p: 2 }} component={Paper} variant="outlined">
            <Typography align="center" gutterBottom>
              Hotel Reservation
            </Typography>
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
              <Controller
                name="Check-in Date"
                defaultValue={new Date()}
                control={control}
                render={({ value, onChange }) => (
                  <MyCustomDatePicker
                    value={value}
                    onChange={onChange}
                    label="Check-in Date"
                  />
                )}
              />
              <Controller
                name="Check-out Date"
                defaultValue={new Date()}
                control={control}
                render={({ value, onChange }) => (
                  <MyCustomDatePicker
                    value={value}
                    onChange={onChange}
                    label="Check-out Date"
                  />
                )}
              />
            </Stack>
          </Stack>
        )}

        {watch("flightReservation") && (
          <Stack spacing={2} sx={{ p: 2 }} component={Paper} variant="outlined">
            <Typography align="center" gutterBottom>
              Flight Booking
            </Typography>
            <Stack>
              <Controller
                name="Trip Type"
                defaultValue="Return Trip"
                control={control}
                render={({ value, onChange }) => (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="Return Trip"
                      control={<Radio />}
                      label="Return Trip"
                    />
                    <FormControlLabel
                      value="One Way"
                      control={<Radio />}
                      label="One Way"
                    />
                  </RadioGroup>
                )}
              />
            </Stack>
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
              <Controller
                name="Departure City, Country"
                defaultValue=""
                control={control}
                render={({ value, onChange }) => (
                  <TextField
                    fullWidth
                    required
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    id="outlined-basic"
                    label="Departure City, Country"
                    variant="outlined"
                    placeholder="Lagos, Nigeria"
                    size="small"
                  />
                )}
              />
              <Controller
                name="Destination City, Country"
                defaultValue=""
                control={control}
                render={({ value, onChange }) => (
                  <TextField
                    fullWidth
                    required
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    id="outlined-basic"
                    label="Destination City, Country"
                    placeholder="London, UK"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            </Stack>
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
              <Controller
                name="Departure Date"
                defaultValue={new Date()}
                control={control}
                render={({ value, onChange }) => (
                  <MyCustomDatePicker
                    value={value}
                    onChange={onChange}
                    label="Departure Date"
                  />
                )}
              />
              {watch("Trip Type") === "Return Trip" ? (
                <Controller
                  name="Return Date"
                  defaultValue={new Date()}
                  control={control}
                  render={({ value, onChange }) => (
                    <MyCustomDatePicker
                      value={value}
                      onChange={onChange}
                      label="Return Date"
                    />
                  )}
                />
              ) : (
                <Box sx={{ width: "100%" }}></Box>
              )}
            </Stack>
          </Stack>
        )}

        <Stack spacing={2} sx={{ p: 2 }} component={Paper} variant="outlined">
          <Typography align="center" gutterBottom>
            Additional Information
          </Typography>

          <Stack spacing={2}>
            <Controller
              name="Additional Information"
              defaultValue=""
              control={control}
              render={({ value, onChange }) => (
                <TextField
                  multiline
                  minRows={5}
                  fullWidth
                  helperText={
                    <Stack component="span" sx={{ fontSize: "12px" }}>
                      <Typography gutterBottom component="span">
                        For family trip for which you need the names of other
                        family members to appear on flight and hotel, kindly
                        provide it here.
                      </Typography>
                      <Typography component="span">
                        For agents that would like us to get in touch with them
                        privately for questions related to this order, provide
                        your personal contact details here.
                      </Typography>
                    </Stack>
                  }
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  id="outlined-basic"
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Controller
            name="Payment Type"
            defaultValue="online"
            control={control}
            render={({ value, onChange }) => (
              <FormControl required>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  How would you like to pay ?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="Online Payment"
                    control={<Radio />}
                    label="Online Payment"
                  />
                  <FormControlLabel
                    value="Bank Deposit / Transfer"
                    control={<Radio />}
                    label="Bank Deposit / Transfer"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
