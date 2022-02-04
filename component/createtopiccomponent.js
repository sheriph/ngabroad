import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import postcategories from "./postcategories";
import "react-toastify/dist/ReactToastify.css";
import { kebabCase, replace } from "lodash";
import { useRecoilState } from "recoil";
import { showLogin_, user_ } from "../state/recoil";
import axios from "axios";

const RichEditor = dynamic(() => import("./richeditor"), {
  ssr: false,
});

export default function CreatePostComponent() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [showEditor, setShowEditor] = useState(false);

  const [user, setUser] = useRecoilState(user_);
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  console.log("user", user);

  useEffect(() => {
    if (window !== undefined) setShowEditor(true);
    if (!user) setShowLogin(true);
  }, [null]);

  const onSubmit = async (data) => {
    console.log("data", data);
    const { content, categories, title } = data;
    const slug = kebabCase(title);
    const email = user?.attributes?.email;
    if (!email) {
      toast.error("Please Login to Post");
      return;
    }
    if (content.length < 20) {
      toast.error("This post is too short");
      return;
    }
    const contentWithImageAltText = `${replace(
      content,
      `alt="replaceableAlt"`,
      `alt="${title}"`
    )}`;
    const stringCategories = categories.map((category) => category.countryName);
    console.log("contentWithImageAltText", contentWithImageAltText);
    try {
      const createPost = await axios.post("/api/createpost", {
        content: contentWithImageAltText,
        categories: stringCategories,
        email,
        slug,
        title,
      });
      console.log("createPost", createPost);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("lodash", kebabCase("how to visit madrid"));

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ mt: 4, mb: 4 }}
      spacing={2}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Stack sx={{ width: "100%" }}>
          <Controller
            name="title"
            defaultValue=""
            control={control}
            render={({ value, onChange }) => (
              <TextField
                fullWidth
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                label="Title"
                variant="outlined"
              />
            )}
          />
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Controller
            name="categories"
            defaultValue={[]}
            control={control}
            render={({ value, onChange }) => {
              console.log("value", value);
              return (
                <Autocomplete
                  ChipProps={{ color: "primary" }}
                  multiple
                  filterSelectedOptions
                  options={postcategories}
                  getOptionLabel={(option) =>
                    option.countryName ? option.countryName : ""
                  }
                  filterOptions={(options, state) =>
                    options.filter((opt) => opt.countryName !== "All Posts")
                  }
                  value={value}
                  onChange={(e, v, r) => {
                    if (r === "selectOption") {
                      console.log("value", v);
                      if (v.length === 3) {
                        toast.error("Maximum is 2 categories.");
                      } else {
                        onChange(v);
                      }
                    } else if (r === "clear") {
                      onChange([]);
                    } else if (r === "removeOption") {
                      onChange(v);
                    }
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      helperText="You can select up to 2 categories"
                      {...params}
                      label="Select Category"
                    />
                  )}
                />
              );
            }}
          />
        </Stack>
      </Stack>
      <Stack>
        <Controller
          name="content"
          defaultValue=""
          control={control}
          render={({ value, onChange }) => {
            return (
              <RichEditor minHeight="500px" value={value} onChange={onChange} />
            );
          }}
        />
        <Button
          //  endIcon={isloading ? <CircularProgress color="inherit" /> : ""}
          //   disabled={isloading}
          type="submit"
          disableElevation
          fullWidth
          variant="contained"
        >
          SUBMIT
        </Button>
      </Stack>
    </Stack>
  );
}
