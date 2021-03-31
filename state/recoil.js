import { atom } from "recoil";

// state variables declared in this file

export const drawerOpen_ = atom({
  key: "drawerOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const schools_ = atom({
  key: "schools", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
