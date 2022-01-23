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
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import { useRecoilState } from "recoil";
import { isDialogOpen_ } from "../state/recoil";
import axios from "axios";



const Newsletter = () => {
  //  const classes = styles();
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
      <Grid
        container
        justifyContent="flex-end"
        sx={{
          position: "absolute",
        }}
      >
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
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Hidden mdDown>
          <Grid item sm={4} container>
            <Grid
              xs={12}
              container
              justifyContent="center"
              alignContent="center"
              item
              sx={{
                backgroundColor: "primary.main",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.primary.main),
                minHeight: "180px",
              }}
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
              justifyContent="center"
              alignContent="center"
              xs={12}
              item
              sx={{
                minHeight: "180px",
              }}
            >
              <Grid item>
                <Typography align="center" variant="h5">
                  NewsLetter Subscription
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8} justifyContent="center" container>
          <Grid
            item
            sx={{
              minHeight: "180px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography>Receive Latest Travel Tips</Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem dense>
                  <ListItemIcon
                    sx={{
                      minWidth: "30px",
                    }}
                  >
                    <FavoriteOutlinedIcon
                      sx={{
                        color: (theme) => theme.palette.secondary.main,
                      }}
                      fontSize="small"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Visa and Immigration" />
                </ListItem>
                <ListItem dense>
                  <ListItemIcon
                    sx={{
                      minWidth: "30px",
                    }}
                  >
                    <FavoriteOutlinedIcon
                      sx={{
                        color: (theme) => theme.palette.secondary.main,
                      }}
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
            justifyContent="center"
            alignContent="center"
            item
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.primary.main),
              minHeight: "180px",
            }}
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
                  //  className={classes.input}
                  sx={{
                    backgroundColor: "white",
                    maxWidth: "350px",
                  }}
                  InputProps={{
                    sx: {
                      color: "text.primary",
                      textAlign: "center",
                    },
                  }}
                  InputLabelProps={{
                    // classes: { outlined: classes.inputText },
                    sx: { color: "text.primary" },
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
                  sx={{
                    color: (theme) =>
                      theme.palette.getContrastText(theme.palette.primary.main),
                    height: "55px",
                    maxWidth: "350px",
                  }}
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
