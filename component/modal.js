// @ts-nocheck
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useRecoilState } from "recoil";
import { isDialogOpen_ } from "../state/recoil";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal({ jsx = "hello dialog" }) {
  const [open, setOpen] = useRecoilState(isDialogOpen_);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      //  keepMounted
      // onClose={handleDialogClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      disableBackdropClick
    >
      {jsx}
    </Dialog>
  );
}
