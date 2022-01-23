import React from "react";
import { Autocomplete, createTheme, Divider, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    //   width: "100%",
    //  maxWidth: "400px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  textField: {
    width: "400px",
    [theme.breakpoints.down('md')]: { width: "300px" },
  },
}));

export default function SearchForm({ allTitles }) {
  const router = useRouter();
  const classes = useStyles();
 // console.log("allTitles", allTitles);
  return (
    <Grid container>
      <Grid item>
        <Autocomplete
          options={allTitles}
          getOptionLabel={(option) => option.title}
          onChange={(e, value, action) => {
            if (action === "selectOption")
              router.push(`/${encodeURIComponent(value.slug)}`);
          }}
          noOptionsText="No article matching your query found"
          // style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              className={classes.textField}
              {...params}
              label="Search Articles ..."
              variant="outlined"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
