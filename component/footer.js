import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  MenuItem,
  MenuList,
  useTheme,
} from "@material-ui/core";
import Link from "next/link";
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
  const theme = useTheme();
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
              backgroundColor: theme.palette.background.default,
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
                  <Link href="/">
                    <Button>HOME</Button>
                  </Link>
                  <Link href="/articles">
                    <Button>ARTICLES</Button>
                  </Link>
                  <Link href="/contactus">
                    <Button>CONTACT US</Button>
                  </Link>
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
                <Link href="/">
                  <img
                    src="https://ngabroadimages.s3.eu-west-2.amazonaws.com/wp-content/uploads/20210330154050/new-logo-reversed_200x73_75.png"
                    width="75px"
                    height="27px"
                  />
                </Link>
              </Grid>

              <Grid item>
                <Grid item spacing={2} container>
                  <Grid item>
                    <Link href="https://www.facebook.com/Naijagoingabroad/">
                      <img
                        src="/images/icons8-facebook-f.svg"
                        alt="socailicons"
                        height="16px"
                        width="16px"
                      />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="https://www.instagram.com/naijagoingabroad/?hl=en">
                      <img
                        src="/images/icons8-instagram.svg"
                        alt="socailicons"
                        height="16px"
                        width="16px"
                      />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="https://twitter.com/ngabroad_?lang=en">
                      <img
                        src="/images/icons8-twitter.svg"
                        alt="socailicons"
                        height="16px"
                        width="16px"
                      />
                    </Link>
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
