import React from "react";
import { Dialog, Slide } from "@mui/material";
//import Slide from "@mui/material/Slide";
import { useRecoilState } from "recoil";
import { isDialogOpen_ } from "../state/recoil";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal({ jsx = "hello dialog" }) {
  const [open, setOpen] = useRecoilState(isDialogOpen_);

  return (
    <Dialog
      open={open}
      // @ts-ignore
      TransitionComponent={Transition}
      //  keepMounted
      // onClose={handleDialogClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      {jsx}
    </Dialog>
  );
}
