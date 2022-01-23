import React from "react";
import clsx from "clsx";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { Typography,Fab, useTheme, CircularProgress } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";



export default function CircularIntegration({ save, setSave, data, title }) {
  const theme = useTheme()
  const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      alignItems: "center",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: "absolute",
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  }));
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    const sentData = { ...data, title };
    console.log("data", sentData);

    if (!loading) {
      setSuccess(false);
      setLoading(true);
      axios
        .post(
          "https://hook.integromat.com/6l2ctei67sfqdhd1sjb69knfxzk4m37s",
          sentData
        )
        .then((response) => {
          console.log(response);
          // @ts-ignore
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            setSave(false);
          }, 2500);
        })
        .catch((error) => console.log(error));
    }
  };

  React.useEffect(() => {
    if (save) handleButtonClick();
  }, [save]);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          //  onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
      <div>{success && <Typography variant="h5">Thank You</Typography>}</div>
    </div>
  );
}
