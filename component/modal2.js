// @ts-nocheck
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal2(props) {
  // const [open, setOpen] = useRecoilState(isDialogOpen_);
  const { open, setOpen } = props;

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
      {props.children}
    </Dialog>
  );
}
