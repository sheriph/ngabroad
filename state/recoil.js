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

export const inputValue = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

/* export const country_ = atom({
  key: "country", // unique ID (with respect to other atoms/selectors)
  default: "Select Country", // default value (aka initial value)
}); */

export const page_ = atom({
  key: "country", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

export const isloading_ = atom({
  key: "isloading",
  default: false,
});

export const allUni_ = atom({
  key: "allUni",
  default: true,
});

export const isDialogOpen_ = atom({
  key: "isDialogOpen",
  default: false,
});

export const formData_ = atom({
  key: "formData_",
  default: null,
});

export const orderData_ = atom({
  key: "orderData_",
  default: null,
});

export const customerInfo_ = atom({
  key: "customerInfo_",
  default: null,
});
