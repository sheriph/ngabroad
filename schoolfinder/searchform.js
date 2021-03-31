// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import {
  LanguageOutlined,
  LibraryBooksOutlined,
  SchoolOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import CustomSelect from "./customselect";
import CustomButton from "./customsearch";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { getdbName } from "./utilities";
import { useSnackbar } from "notistack";
//import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { page_ } from "./recoil";
import LinearBuffer from "./bufferprogress";
import { countries } from "./studycountries";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { updateData } from "../component/utilityfx";
import { schools_ } from "../state/recoil";

const styles = makeStyles((theme) => ({
  /*  skeleton: {
    width: "500px",
    [theme.breakpoints.down("xs")]: { width: "300px" },
  }, */
  gridItem: {
    display: "initial",
  },
}));

const SearchForm = ({ setcountry, setfield, setlevel }) => {
  const classes = styles();
  const [dbname, setdbName] = useState(null);
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [school, setschools] = useRecoilState(schools_);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isloading, setisloading] = useState(false);
  const [enter, setenter] = useState(false);

  const [options, setOptions] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/api/getschools", data)
      .then((response) => {
        console.log(response);
        const { error, results } = response.data;
        if (results) {
          setschools(results);
        } else {
          throw new Error(error);
        }
      })
      .then((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("/api/getfilter")
      .then((response) => {
        console.log(response);
        if (response.data.results) {
          setOptions(response.data.results);
        } else {
          throw new Error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!options)
    return (
      <Grid container justify="center">
        <Grid item component={Paper} xs={12}>
          <Skeleton animation="wave" variant="rect" height={140} />
        </Grid>
      </Grid>
    );

  const getDegreeOptions = (option) => {
    return Array.from(new Set(option.map((data) => updateData(data))))
      .map((data) => ({
        academiclevel: data,
      }))
      .filter((item) => item.academiclevel !== "null");
  };

  return (
    <Container maxWidth={false} disableGutters>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Autocomplete
              options={options[0]}
              getOptionLabel={(option) => option.country}
              onChange={(e, value, action) => {
                if (action === "select-option") {
                  // getfilter();
                }
              }}
              noOptionsText="Please select a country from the list"
              renderInput={(params) => (
                <TextField
                  component={Paper}
                  // className={classes.textField}
                  {...params}
                  label="Select a Country"
                  variant="outlined"
                  inputRef={register}
                  name="country"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              //  disabled={field.length === 0}
              options={options[1]
                .map((item) => {
                  if (item.level.length > 1) {
                    return item;
                  } else {
                    return { level: "Others" };
                  }
                })
                .filter((item) => item.level !== "Others")}
              getOptionLabel={(option) => option.level}
              onChange={(e, value, action) => {
                if (action === "select-option") {
                }
              }}
              noOptionsText="Please Select a Field of Study"
              renderInput={(params) => (
                <TextField
                  component={Paper}
                  // className={classes.textField}
                  {...params}
                  label="Select a Field"
                  variant="outlined"
                  inputRef={register}
                  name="field"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              // disabled={level.length === 0}
              options={getDegreeOptions(options[2])}
              getOptionLabel={(option) => option.academiclevel}
              onChange={(e, value, action) => {
                if (action === "select-option") {
                }
              }}
              noOptionsText="Please select a level from the list"
              renderInput={(params) => (
                <TextField
                  component={Paper}
                  // className={classes.textField}
                  {...params}
                  label="Select a Level"
                  variant="outlined"
                  inputRef={register}
                  name="level"
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchOutlined />}
              size="large"
              style={{ height: "55px" }}
              color="primary"
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
        {isloading && (
          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <Collapse in={enter} timeout="auto">
              <LinearBuffer />
            </Collapse>
          </Grid>
        )}
      </form>
    </Container>
  );
};

export default SearchForm;
