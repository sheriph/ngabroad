import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useMediaQuery } from "@mui/material";

export default function MyCustomDatePicker({
  label = "Insurance Start Date",
  value,
  onChange,
}) {
  // const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    onChange(newValue);
  };

  const mobile = useMediaQuery("(max-width:600px)");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack sx={{ width: "100%" }} spacing={3}>
        {!mobile ? (
          <DesktopDatePicker
            label={label}
            inputFormat="dd MMMM yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        ) : (
          <MobileDatePicker
            label={label}
            inputFormat="dd MMMM yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
}
