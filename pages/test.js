// @ts-nocheck
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import { CancelPresentation } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const AdblockNotifications = () => {
  return (
    <Box component={Alert} severity="error" style={{ alignItems: "baseline" }}>
      <Grid container justify="flex-end">
        <Grid item>
          <IconButton size="medium" color="primary">
            <CancelPresentation fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h5" align="center" gutterBottom>
            AD BLOCKER DETECTED
          </Typography>
          <Typography gutterBottom>
            We are able to keep this website running through funds from ads and
            services, Kindly support us by disabling your Ads blocker for this
            website.
          </Typography>
          <Typography style={{ marginTop: "20px" }} align="center">
            Thank you.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdblockNotifications;
