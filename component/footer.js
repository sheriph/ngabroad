// @ts-nocheck
import { Button, ButtonGroup, Container, Grid, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = ({ isAmp }) => {
  const theme = useTheme();
  const styles = makeStyles(() => ({
    buttongrouproot: {
      alignItems: "start",
    },
    footer: {
      backgroundColor: theme.palette.background.default,
    },
  }));
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
              backgroundColor: theme.palette.background.default,
              borderBottomRightRadius: "20px",
            }}
          >
            <Grid item container>
              <Grid item>
                {isAmp ? (
                  <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                    <li>
                      <a style={{ textDecoration: "none" }} href="/">
                        <Button>HOME</Button>
                      </a>
                    </li>
                    <li>
                      <a style={{ textDecoration: "none" }} href="/articles">
                        <Button>ARTICLES</Button>
                      </a>
                    </li>
                    <li>
                      <a style={{ textDecoration: "none" }} href="/contactus">
                        <Button>CONTACT US</Button>
                      </a>
                    </li>
                  </ul>
                ) : (
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
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            // xs={4}
          >
            <Grid item container direction="column">
              <Grid item>
                {isAmp ? (
                  <a style={{ textDecoration: "none" }} href="/">
                    <amp-img
                      src="/images/mobile-logo-reversed_75x27.png"
                      alt="logo"
                      width="75"
                      height="27"
                      layout="fixed"
                    ></amp-img>
                  </a>
                ) : (
                  <Link href="/">
                    <span>
                      <Image
                        src="/images/mobile-logo-reversed_75x27.png"
                        alt="logo"
                        width="75"
                        height="27"
                        layout="intrinsic"
                      />
                    </span>
                  </Link>
                )}
              </Grid>

              {!isAmp && (
                <Grid item>
                  <Grid item spacing={2} container>
                    <Grid item>
                      <Link href="https://www.facebook.com/Naijagoingabroad/">
                        <span>
                          <Image
                            src="/images/icons8-facebook-f.svg"
                            alt="socailicons"
                            height="16"
                            width="16"
                            layout="intrinsic"
                          />
                        </span>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="https://www.instagram.com/naijagoingabroad/?hl=en">
                        <span>
                          <Image
                            src="/images/icons8-instagram.svg"
                            alt="socailicons"
                            height="16"
                            width="16"
                            layout="intrinsic"
                          />
                        </span>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="https://twitter.com/ngabroad_?lang=en">
                        <span>
                          <Image
                            src="/images/icons8-twitter.svg"
                            alt="socailicons"
                            height="16"
                            width="16"
                            layout="intrinsic"
                          />
                        </span>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Footer;
