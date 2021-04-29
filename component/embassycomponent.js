// @ts-nocheck
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import React, { useState } from "react";
import EmbassyCard from "./embassycard";
import { countriesWithEmbassyInNigeria, embassyAddress } from "./embassyfinder";
import LazyLoad from "react-lazyload";
import GoogleAds from "./googleads";

const styles = makeStyles((theme) => ({
  grid: {
    marginTop: "20px",
    marginBottom: "30px",
  },
  autocomplete: {
    marginBottom: "20px",
  },
}));

const EmbassyComponent = () => {
  const classes = styles();
  const [fixEmbassyList, setFix] = useState(embassyAddress);
  const [embassyList, setEmbassyList] = useState(embassyAddress);

  const slot = [
    "8519630377",
    "1584472777",
    "2131267688",
    "9212693114",
    "8199828498",
    "3061205970",
    "4657127169",
    "6868341620",
    "5778637149",
    "4242178287",
    "5587065453",
  ];

  //console.log(embassyList);

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12} className={classes.autocomplete}>
        <Autocomplete
          options={countriesWithEmbassyInNigeria}
          getOptionLabel={(option) => option.name}
          onChange={(e, value, action) => {
            if (action === "select-option") {
              const newEmbassyList = fixEmbassyList.filter((item) =>
                item.Title.toLowerCase().includes(
                  value.name.toLowerCase().slice(0, 4)
                )
              );

              setEmbassyList(newEmbassyList);
            }
          }}
          noOptionsText="No embassy found for the country entered"
          renderInput={(params) => (
            <TextField
              component={Paper}
              className={classes.textField}
              {...params}
              label="Enter a Country Name ..."
              variant="outlined"
            />
          )}
        />
      </Grid>
      {embassyList.map((embassy, index) => (
        <Box key={index}>
          <LazyLoad
            height={300}
            offset={800}
            unmountIfInvisible
            scroll
            debounce
          >
            <Grid item key={index} xs={12}>
              <EmbassyCard embassy={embassy} />
            </Grid>
          </LazyLoad>
          {index > 0 && index % 3 === 0 && (
            <GoogleAds slot={`${slot[Math.ceil(Math.random() * 10)]}`} />
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default EmbassyComponent;
