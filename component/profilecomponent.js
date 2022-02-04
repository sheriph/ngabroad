import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { showLogin_, userData_, user_ } from "../state/recoil";
import UploadIcon from "@mui/icons-material/Upload";
import MyBackdrop from "./backdrop";
import axios from "axios";
import { Storage } from "aws-amplify";

export default function ProfileComponent() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useRecoilState(user_);
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);
  const [userData, showUserData] = useRecoilState(userData_);
  const [blob, setblob] = useState("");
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData) setShowLogin(true);
    register("avatar");
    register("file");
  }, [null]);
  const saveProfile = async (data) => {
    const { firstName, lastName, username, file } = data;

    try {
      setLoading(true);
      console.log("file", file);
      const upload = file
        ? await Storage.put(`media/${file.name}`, file, {})
        : undefined;
      const avatarSrc = upload
        ? `https://ngabroadbucket210504-dev.s3.eu-west-2.amazonaws.com/public/${upload.key}`
        : undefined;

      const obj = {
        firstName: firstName || userData.firstName || "",
        lastName: lastName || userData.lastName || "",
        username: username || userData.username || "",
        email: userData.email,
        avatar: avatarSrc || userData.avatar || "",
      };
      console.log("obj", obj);
      const update = await axios.post("/api/updateuser", { ...obj });
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  if (!userData) {
    return <MyBackdrop open={true} />;
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    setValue("file", file);
    const img = URL.createObjectURL(file);
    setValue("avatar", img);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(saveProfile)}
      spacing={2}
      sx={{ mt: 2, mb: 4 }}
    >
      <Stack sx={{ mb: 2 }}>
        {!userData.avatar && (
          <input
            hidden
            type="file"
            id="avatar"
            // accept="image/png, image/jpeg"
            onChange={handleAvatarUpload}
          />
        )}
        <Stack>
          <Stack
            component="label"
            htmlFor="avatar"
            direction="row"
            justifyContent="center"
          >
            <Badge
              sx={{ cursor: "pointer" }}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                userData.avatar ? "" : <UploadIcon color="primary" />
              }
            >
              <Avatar alt="avatar" src={watch("avatar") || userData.avatar} />
            </Badge>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <TextField
          //  disabled
          defaultValue={userData.email}
          size="small"
          fullWidth
          variant="outlined"
          label="Email"
          required
          disabled={Boolean(userData.email)}
        />
        <Controller
          name="username"
          defaultValue={userData.username}
          control={control}
          render={(data) => (
            <TextField
              {...data}
              //  disabled
              size="small"
              fullWidth
              variant="outlined"
              label="Username"
              required
              disabled={Boolean(userData.username)}
              helperText="Username cannot be edited once submitted"
            />
          )}
        />
      </Stack>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <Controller
          name="firstName"
          defaultValue={userData.firstName}
          control={control}
          render={(data) => (
            <TextField
              {...data}
              //  disabled
              size="small"
              fullWidth
              variant="outlined"
              label="First Name"
              helperText="Optional Field"
            />
          )}
        />
        <Controller
          name="lastName"
          defaultValue={userData.lastName}
          control={control}
          render={(data) => (
            <TextField
              {...data}
              //  disabled
              size="small"
              fullWidth
              variant="outlined"
              label="Last Name"
              helperText="Optional Field"
            />
          )}
        />
      </Stack>
      <Button
        endIcon={isloading ? <CircularProgress color="inherit" /> : ""}
        disabled={isloading}
        variant="outlined"
        fullWidth
        type="submit"
      >
        Submit
      </Button>
    </Stack>
  );
}
