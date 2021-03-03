import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme) => ({
  buttongrouproot: {
    alignItems: "start",
  },
  footer: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Footer = () => {
  const classes = styles();
  return (
    <Container disableGutters maxWidth={false}>
      <Container>
        <Grid container spacing={3}>
          <Grid
            className={classes.footer}
            item
            xs
            style={{
              margin: "-1px 20px 30px 15px",
              borderBottomRightRadius: "20px",
            }}
          >
            <Grid item container>
              <Grid item>
                <ButtonGroup
                  classes={{ root: classes.buttongrouproot }}
                  orientation="vertical"
                  color="primary"
                  aria-label="vertical contained primary button group"
                  variant="text"
                  size="small"
                >
                  <Button>HOME</Button>
                  <Button>ARTICLES</Button>
                  <Button>CONTACT US</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            // xs={4}
          >
            <Grid item container direction="column">
              <Grid item>
                <img
                  src="https://naijagoingabroad.com/wp-content/uploads/2021/01/new-logo-reversed_200x73_75.png"
                  width="75px"
                  height="27px"
                />
              </Grid>

              <Grid item>
                <Grid item spacing={2} container>
                  <Grid item>
                    <img
                      src="/images/icons8-facebook-f.svg"
                      alt="socailicons"
                      height="16px"
                      width="16px"
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src="/images/icons8-instagram.svg"
                      alt="socailicons"
                      height="16px"
                      width="16px"
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src="/images/icons8-twitter.svg"
                      alt="socailicons"
                      height="16px"
                      width="16px"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Footer;
