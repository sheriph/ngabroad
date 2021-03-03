import { atom } from "recoil";

// state variables declared in this file

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const drawerOpen_ = atom({
  key: "drawerOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
