import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { Divider, TextField } from "@material-ui/core";
import { countries } from "./insuranceprice";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("xs")]: { width: "300px" },
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
            if (action === "select-option")
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
