import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { first } from "lodash";
import React from "react";
import IconBreadcrumbs from "./breadcrumb";
import ForumCard from "./forumcard";
import SearchTitle from "./searchtitle";
import SingleThread from "./singlethread";
import Link from "next/link";

export default function ThreadComponent({ post }) {
  console.log("the post", post);

  return (
    <Stack sx={{ mt: 2, mb: 6 }} spacing={{ xs: 0, sm: 2 }} direction="row">
      <Stack spacing={1}>
        <IconBreadcrumbs
          slug={post.discussionThread[0]["slug"]}
          title={post.discussionThread[0]["title"]}
        />
        <Box sx={{ display: { sm: "none" }, width: "100%" }}>
          <SearchTitle />
        </Box>

        <Stack direction="row" spacing={{ xs: 0, sm: 1 }}>
          <Box sx={{ display: { xs: "none", sm: "unset" }, width: "100%" }}>
            <SearchTitle />
          </Box>
          <Link href="/createtopic">
            <Button
              disableElevation
              sx={{}}
              variant="contained"
              size="small"
              fullWidth
              component="a"
            >
              Create a Topic
            </Button>
          </Link>
        </Stack>
        <SingleThread post={post} />
      </Stack>
    </Stack>
  );
}
