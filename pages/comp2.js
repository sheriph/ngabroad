import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import {
  Box,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const fetcher = async () => {
  try {
    const titleSlugs = await axios.get("/api/getslugandtitle");
    console.log("titleSlugs", titleSlugs);
    return titleSlugs.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default function ComboBox() {
  const [search, setSearch] = React.useState(undefined);
  const { data, error } = useSWRImmutable(search, fetcher);
  const [value, setValue] = React.useState("");
  console.log("data, error", data, error);
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    const img = URL.createObjectURL(file);
    console.log("img", img);
    setValue(img);
  };

  console.log("value", value);
  return (
    <>
      <input
        //  hidden
        type="file"
        // accept="image/png, image/jpeg"
        onChange={handleAvatarUpload}
      />
      <img src={value} width="auto" height="auto" />
    </>
  );
}
