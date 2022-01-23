import React from "react";
import { Modal, Backdrop, Fade, createTheme, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    //  backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const OrderModal = ({ openModal = false, jsx = <></>, setOpenModal }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
     // BackdropComponent={Backdrop}
      component={Paper}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {jsx}
    </Modal>
  );
};

export default OrderModal;
