// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  LanguageOutlined,
  LibraryBooksOutlined,
  SchoolOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRecoilState } from "recoil";
import { Autocomplete, Skeleton } from "@mui/lab";
import { updateData } from "../component/utilityfx";
import { schools_, isloading_ } from "../state/recoil";
import { startCase } from "lodash";
import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  gridItem: {
    display: "initial",
  },
}));

const SearchForm2 = ({ isAmp }) => {
  const classes = styles();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [school, setschools] = useRecoilState(schools_);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isloading, setisloading] = useRecoilState(isloading_);
  const [enter, setenter] = useState(false);

  const [options, setOptions] = useState(null);

  const [countries, setCountry] = useState(null);
  const [level, setLevel] = useState(null);
  const [field, setField] = useState(null);

  const onSubmit = async (data) => {
    setisloading(true);
    const { country, field, level } = data;
    if (country.length === 0 || field.length === 0 || level.length === 0) {
      enqueueSnackbar("Please select options in country, field and level", {
        variant: "error",
      });
      setisloading(false);

      return;
    }

    console.log(data);

    try {
      const response = await axios.post("/api/getschools2", data);
      const { results } = response.data;
      if (results) {
        setschools(results);
      } else {
        throw new Error(error);
      }
      setisloading(false);
    } catch (error) {
      setisloading(false);
      console.log(error.response.data);
      console.log(`error`, error);
    }
  };

  const getFilter = async (isloading) => {
    setOptions(null);
    try {
      const response = await axios.get("/api/getfilter2");
      const [countries, field, level] = response.data.results;
      const formattedCountries = countries
        .map((country) => startCase(country["TABLE_NAME"]))
        .sort()
        .map((country) => ({ country: country }));
      if (isloading) {
        setCountry(formattedCountries);
        setField(field);
        setLevel(level);
        setOptions(true);
        //    setisloading(false);
        isloading = true;
      }
    } catch (error) {
      console.log(`error`, error);
      setisloading(false);
    }
  };

  useEffect(() => {
    // console.log("mounting form 2");
    let isloading = true;
    getFilter(isloading);
    return () => {
      isloading = false;
    };
  }, []);

  if (!options)
    return (
      <Grid container justifyContent="center">
        <Grid item component={Paper} xs={12}>
          <Skeleton animation="wave" variant="rectangular" height={140} />
        </Grid>
        {isAmp && (
          <Typography
            style={{ position: "absolute", lineHeight: "140px" }}
            variant="h4"
          >
            <a style={{ textDecoration: "none" }} href="/studyabroad">
              CLICK TO LOAD DATA
            </a>
          </Typography>
        )}
      </Grid>
    );

  return (
    <Container maxWidth={false} disableGutters>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Autocomplete
              options={countries}
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
              options={field}
              getOptionLabel={(option) => option.field}
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
              options={level}
              getOptionLabel={(option) => option.level}
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
      </form>
    </Container>
  );
};

export default SearchForm2;
