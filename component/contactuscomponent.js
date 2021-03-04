import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { CallOutlined, EmailOutlined, HouseOutlined } from "@material-ui/icons";

const styles = makeStyles((theme) => ({
  button: {
    justifyContent: "flex-start",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: "30px",
  },
}));

const ContactUs = () => {
  const classes = styles();
  return (
    <Grid
      container
      //   spacing={3}
      component={Container}
      className={classes.container}
    >
      <Grid item container xs={12} sm={5}>
        <Grid
          item
          container
          alignItems="center"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item>
            <Typography>Send us an email</Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Your Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Your Email" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Telephone Number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Your Message"
                multiline
                rows={4}
                //  defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item container xs={12} sm={7}>
        <Grid item xs={12}>
          <img src="/images/contactus.svg" height="300px" width="100%" />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <ButtonGroup
              size="large"
              variant="contained"
              orientation="vertical"
              fullWidth
              color="primary"
            >
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<CallOutlined />}
              >
                09065369929 (call/whatsapp)
              </Button>
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<CallOutlined />}
              >
                08087164862
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup
              size="large"
              variant="contained"
              orientation="vertical"
              fullWidth
              color="primary"
            >
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<EmailOutlined />}
              >
                info@naijagoingabroad.com
              </Button>
              <Button
                style={{ textTransform: "none" }}
                className={classes.button}
                startIcon={<HouseOutlined />}
              >
                65c Opebi Rd, Ikeja, Lagos
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
