import { Container, Grid, Paper, Typography } from "@material-ui/core";

const FeatureCard = ({
  src = "",
  height = "150px",
  width = "200px",
  alt = "feature cards",
  p1 = "",
  p2 = "",
}) => {
  return (
    <Container
      component={Paper}
      elevation={10}
      style={{ paddingTop: "10px", paddingBottom: "10px", minHeight: "290px" }}
    >
      <Grid container>
        <Grid item container justify="center" xs={12}>
          <Grid item>
            <img src={src} height={height} width={width} alt={alt} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography align="center" variant="h4" color="primary">
                {p1}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">{p2}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeatureCard;
