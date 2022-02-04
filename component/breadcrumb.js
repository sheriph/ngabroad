import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { lowerCase, startCase, truncate } from "lodash";

export default function IconBreadcrumbs({ slug, title }) {
  const mobile = useMediaQuery("(max-width:600px)");
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/discussion">
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { color: "primary.main", textDecoration: "underline" },
          }}
          alignItems="center"
          direction="row"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          <Typography component="a">Discussion</Typography>
        </Stack>
      </Link>
      <Link href={`/blog/${encodeURIComponent(slug)}`}>
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { color: "primary.main", textDecoration: "underline" },
          }}
          alignItems="center"
          direction="row"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          <Typography component="a">
            {truncate(startCase(lowerCase(title)), {
              length: mobile ? 27 : 200,
            })}
          </Typography>
        </Stack>
      </Link>
    </Breadcrumbs>
  );
}
