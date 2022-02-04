import "@aws-amplify/ui-react/styles.css";
import { Box, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

export default function LoginHead({ setShowLogin }) {
  return (
    <Stack
      sx={{
        "button.amplify-button.amplify-field-group__control[data-variation=primary]":
          { bgcolor: "primary.main" },
      }}
      direction="row"
      justifyContent="space-between"
    >
      <Box
        sx={{
          width: "150px",
          height: "68px",
          ml: 1,
          my: 2,
        }}
        display="block"
        justifyContent="center"
      >
        <Image
          src="/images/logo150px.png"
          alt="Sign In Logo"
          width="150px"
          height="68px"
          layout="responsive"
        />
      </Box>
      <IconButton
        onClick={() => setShowLogin(false)}
        size="large"
        color="primary"
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
}
