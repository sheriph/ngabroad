// @ts-nocheck
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { CancelPresentation } from "@mui/icons-material";
import { Alert } from "@mui/lab";

const AdblockNotifications = () => {
  return (
    <Box component={Alert} severity="error" style={{ alignItems: "baseline" }}>
      <Grid container justifyContent="flex-end">
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
