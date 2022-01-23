import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useMediaQuery } from "@mui/material";

export default function MaterialUIPickers({ label = "Insurance Start Date" }) {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const mobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack sx={{ p: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          {!mobile ? (
            <DesktopDatePicker
              label={label}
              inputFormat="dd MMMM yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            <MobileDatePicker
              label={label}
              inputFormat="dd MMMM yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        </Stack>
      </LocalizationProvider>
    </Stack>
  );
}
