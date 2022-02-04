import {
  Backdrop,
  Button,
  ButtonBase,
  Container,
  Grid,
  Hidden,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Apps from "@mui/icons-material/Apps";
import Image from "next/image";
import DrawerMenu from "./drawermenu";
import AppHeader from "./appheader";
import Link from "next/link";
import LoginMenu from "./loginmenu";

const MyHeader = () => {
  const [open, setOpen] = useState(false);
  // const classes = styles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      window !== undefined &&
      window.location.href.includes("openmenu=true")
    ) {
      setOpen(true);
    }
  }, []);

  return (
    <Container disableGutters>
      <DrawerMenu
        open={open}
        // @ts-ignore
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleDrawerClose}
      />
      <Hidden smDown>
        <Container>
          <Grid container justifyContent="flex-end">
            <Grid
              item
              container
              spacing={2}
              alignItems="center"
              //  className={classes.primaryHeader}
            >
              <Grid item xs>
                <Link href="/">
                  <ButtonBase
                    // className={classes.primaryHeaderButton}
                    component={Button}
                    startIcon={
                      <Image
                        src="/images/desktop-logo-reversed_200x73_75.png"
                        alt="logo"
                        width="105"
                        height="38"
                        layout="intrinsic"
                      />
                    }
                  ></ButtonBase>
                </Link>
              </Grid>

              <Grid item>
                <Link passHref href="/">
                  <ButtonBase
                    sx={{ color: "white !important" }}
                    component={Button}
                  >
                    HOME
                  </ButtonBase>
                </Link>
              </Grid>

              <Grid item>
                <Link passHref href="/articles">
                  <ButtonBase
                    sx={{ color: "white !important" }}
                    component={Button}
                  >
                    ARTICLES
                  </ButtonBase>
                </Link>
              </Grid>

              <Grid item>
                <LoginMenu />
              </Grid>

              <Grid item>
                <ButtonBase
                  sx={{ color: "white !important" }}
                  component={Button}
                  variant="outlined"
                  color="secondary"
                  endIcon={<Apps />}
                  onClick={handleDrawerOpen}
                >
                  MORE
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Hidden>
      <Hidden smUp>
        <AppHeader
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      </Hidden>
    </Container>
  );
};

export default MyHeader;
