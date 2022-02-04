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

export default function SearchTitle() {
  const [search, setSearch] = React.useState(undefined);
  const { data, error } = useSWRImmutable(search, fetcher);
  console.log("data, error", data, error);
  return (
    <Autocomplete
      disablePortal
      //  onOpen={() => setSearch("search")}
      options={data || []}
      getOptionLabel={(option) => option.title}
      //  sx={{ width: 300 }}
      fullWidth
      onInputChange={(e, v, r) => {
        if (r === "input" && v.length > 3) {
          setSearch("search");
        }
      }}
      size="small"
      loading={!data && !error}
      loadingText={
        <Stack sx={{ width: "100%" }} direction="row" alignContent="center">
          {search && <LinearProgress sx={{ width: "100%" }} color="primary" />}
        </Stack>
      }
      renderInput={(params) => (
        <TextField size="small" fullWidth {...params} label="Search Title" />
      )}
      renderOption={(props, option, state) => (
        <li {...props}>
          <Link href={`/blog/${encodeURIComponent(option.slug)}`}>
            <Typography>{option.title}</Typography>
          </Link>
        </li>
      )}
    />
  );
}
