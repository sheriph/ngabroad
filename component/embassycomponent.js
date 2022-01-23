import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Autocomplete, Skeleton } from "@mui/material";
import React, { useState } from "react";
import EmbassyCard from "./embassycard";
import { countriesWithEmbassyInNigeria, embassyAddress } from "./embassyfinder";
import LazyLoad from "react-lazyload";
import GoogleAds from "./googleads";
import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
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
            if (action === "selectOption") {
              const newEmbassyList = fixEmbassyList.filter((item) =>
                item.Title.toLowerCase().includes(
                  // @ts-ignore
                  value.name.toLowerCase().slice(0, 4)
                )
              );

              setEmbassyList(newEmbassyList);
            }
          }}
          noOptionsText="No embassy found for the country entered"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter a Country Name ..."
              variant="outlined"
            />
          )}
        />
      </Grid>
      {embassyList.map((embassy, index) => (
        <div key={index}>
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
        </div>
      ))}
    </Grid>
  );
};

export default EmbassyComponent;
