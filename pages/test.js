import { Container, Grid, Paper, Typography } from "@material-ui/core";

const Test = () => {
  return (
    <Container
      component={Paper}
      elevation={10}
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
    >
      <Grid container>
        <Grid item container justify="center" xs={12}>
          <Grid item>
            <img
              src="/images/flight.svg"
              height="150px"
              width="200px"
              alt="flight booking"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography align="center" variant="h4" color="primary">
                Flights Booking
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                We can assist you with affordable flight to all destinations
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Test;
