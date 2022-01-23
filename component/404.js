// @ts-nocheck
import * as React from 'react'
import { Box, Grid, Typography } from "@mui/material";


const FourOFourComponent = ({ isAmp }) => {
  return (
    <Box m={4}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6}>
          {isAmp ? (
            <amp-img
              alt="404 image"
              src="images/404.svg"
              height="200"
              width="320"
              layout="responsive"
            ></amp-img>
          ) : (
            <img
              src="images/404.svg"
              height="auto"
              width="100%"
              alt="404 image"
            />
          )}
        </Grid>
        <Grid item xs={12} sm="auto">
          <Typography variant="h5" gutterBottom>
            Awww... Page Not Found
          </Typography>
          <Typography gutterBottom>
            But... not for lack of trying from our end
          </Typography>
          <Typography> C'mon, It's just a 404 Error !!! </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FourOFourComponent;
