import { Button, ButtonGroup, Grid, makeStyles } from "@material-ui/core";
import { CallOutlined, EmailOutlined, HouseOutlined } from "@material-ui/icons";

const styles = makeStyles((theme) => ({
  button: {
    justifyContent: "flex-start",
  },
  container: {
    marginTop: theme.spacing(2)
  },
}));

const ContactUs = () => {
  const classes = styles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={5}>
      form
      </Grid>
      <Grid item container xs={12} sm={7}>
        <Grid item xs={12}>
          <img src="/images/contactus.svg" height="300px" width="100%" />
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup size="large" variant="contained" orientation="vertical">
            <Button className={classes.button} startIcon={<CallOutlined />}>
              09065369929 (call/whatsapp)
            </Button>
            <Button className={classes.button} startIcon={<CallOutlined />}>
              08087164862
            </Button>
            <Button className={classes.button} startIcon={<EmailOutlined />}>
              info@naijagoingabroad.com
            </Button>
            <Button className={classes.button} startIcon={<HouseOutlined />}>
              65c Opebi Rd, Ikeja, Lagos
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
