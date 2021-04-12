// @ts-nocheck
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import SendIcon from "@material-ui/icons/Send";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import { useRecoilState } from "recoil";
import { isDialogOpen_ } from "../state/recoil";
import axios from "axios";

const styles = makeStyles((theme) => ({
  grid1: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    minHeight: "180px",
  },
  grid2: {
    minHeight: "180px",
  },
  grid3: {
    minHeight: "180px",
    display: "flex",
    alignItems: "center",
  },
  grid4: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    minHeight: "180px",
  },
  button: {
    // backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    height: "55px",
    maxWidth: "350px",
  },
  loveIcon: {
    color: theme.palette.secondary.main,
  },
  listIcon: {
    minWidth: "30px",
  },
  input: {
    backgroundColor: "white",
    maxWidth: "350px",
  },
  inputText: {
    color: theme.palette.text.primary,
  },
  inputprops: {
    color: theme.palette.text.primary,
    textAlign: "center",
  },
  cancelIcon: {
    position: "absolute",
   /*  top: "-18px",
    right: "-15px", */
  },
}));

const Newsletter = () => {
  const classes = styles();
  const [isloading, setLoading] = useState(false);
  const [isSubscribed, setSubscribed] = useState(false);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setModalOpen] = useRecoilState(isDialogOpen_);

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(
        "https://hook.integromat.com/2cdsgify5wl4cgjt0r5xjyrjac5da3jc",
        data
      )
      .then((response) => {
        setSubscribed(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="flex-end" className={classes.cancelIcon}>
        <Grid item>
          <IconButton
            onClick={() => setModalOpen(false)}
            size="medium"
            color="primary"
          >
            <CancelPresentationOutlinedIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Hidden xsDown>
          <Grid item sm={4} container>
            <Grid
              xs={12}
              container
              justify="center"
              alignContent="center"
              item
              className={classes.grid1}
            >
              <Grid item>
                <Image
                  src="/images/desktop-logo-reversed_200x73_75.png"
                  alt="logo"
                  width="105"
                  height="38"
                  layout="intrinsic"
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignContent="center"
              xs={12}
              item
              className={classes.grid2}
            >
              <Grid item>
                <Typography align="center" variant="h5">
                  NewsLetter Subscription
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8} justify="center" container>
          <Grid item className={classes.grid3}>
            <Box>
              <Typography>Receive Latest Travel Tips</Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem dense>
                  <ListItemIcon classes={{ root: classes.listIcon }}>
                    <FavoriteOutlinedIcon
                      className={classes.loveIcon}
                      fontSize="small"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Visa and Immigration" />
                </ListItem>
                <ListItem dense>
                  <ListItemIcon classes={{ root: classes.listIcon }}>
                    <FavoriteOutlinedIcon
                      className={classes.loveIcon}
                      fontSize="small"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Study Abroad and much more..." />
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid
            // spacing={2}
            justify="center"
            alignContent="center"
            item
            className={classes.grid4}
            container
          >
            <Grid
              xs={12}
              item
              style={{
                margin: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isSubscribed ? (
                <Typography variant="h5">Thank You !!!</Typography>
              ) : (
                <TextField
                  inputRef={register}
                  name="email"
                  fullWidth
                  variant="outlined"
                  //   label="Email"
                  placeholder="Enter your email"
                  className={classes.input}
                  InputProps={{ classes: { input: classes.inputprops } }}
                  InputLabelProps={{
                    classes: { outlined: classes.inputText },
                  }}
                />
              )}
            </Grid>
            <Grid
              xs={12}
              item
              style={{
                margin: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isSubscribed ? (
                <Typography>
                  You have now subscribed to our newsletter
                </Typography>
              ) : (
                <Button
                  className={classes.button}
                  type="submit"
                  disableElevation
                  fullWidth
                  size="large"
                  endIcon={
                    isloading ? (
                      <CircularProgress size="20px" color="inherit" />
                    ) : (
                      <SendIcon />
                    )
                  }
                >
                  SEND
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Newsletter;
