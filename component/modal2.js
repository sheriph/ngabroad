import { Dialog, Slide } from "@mui/material";
import React from "react";


const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal2(props) {
  // const [open, setOpen] = useRecoilState(isDialogOpen_);
  const { open, setOpen } = props;

  return (
    <Dialog
      open={open}
      // @ts-ignore
      TransitionComponent={Transition}
      //  keepMounted
      // onClose={handleDialogClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      {props.children}
    </Dialog>
  );
}
