import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import ForumCard from "./forumcard";
import ForumCardSkeleton from "./forumcardskeleton";
import postcategories from "./postcategories";
import SearchTitle from "./searchtitle";

const fetcher = async (key) => {
  const keys = key.split("-");
  const [page, category] = keys;
  console.log("page, category", page, category);
  try {
    const fetching = await fetch("/api/getpaginatedposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageNumber: page,
        category: category === "All Posts" ? undefined : category,
      }),
    });
    const posts = await fetching.json();
    console.log("posts", posts);
    return posts;
  } catch (error) {
    console.log("error", error);
  }
};

export default function DiscussionComponent() {
  const [category, setCategory] = React.useState("All Posts");
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(5);
  const { data: posts, error } = useSWRImmutable(
    `${page}-${category}`,
    fetcher
  );
  const handlePagination = (event, value) => {
    setPage(value);
    executeScroll();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const myRef = React.useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const countTotalPosts = async (page) => {
    try {
      const fetching = await fetch("/api/gettotalpostscount");
      const totalPostsCount = await fetching.json();
      console.log("posts", totalPostsCount);
      setPageCount(Math.ceil(totalPostsCount / 20));
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    countTotalPosts();
  }, [null]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    console.log("event", event);
    setSelectedIndex(index);
    setCategory(event.target.outerText);
    executeScroll();
  };

  return (
    <Stack ref={myRef} sx={{ mb: 2, width: "100%" }}>
      <Stack
        sx={{ my: 2, width: "100%" }}
        spacing={{ xs: 0, sm: 2 }}
        direction="row"
      >
        <Stack
          sx={{
            display: { xs: "none", sm: "unset" },
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Countries
          </Typography>
          <List dense>
            {postcategories.map((country, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  sx={{ pl: 0 }}
                  component="a"
                >
                  <ListItemText
                    sx={{ whiteSpace: "nowrap" }}
                    primary={country.countryName}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Box sx={{ display: { sm: "none" }, width: "100%" }}>
            <SearchTitle />
          </Box>
          <Stack direction="row" spacing={0}>
            <TextField
              sx={{ display: { sm: "none" } }}
              select
              size="small"
              fullWidth
              label="Select A Country"
              value={category}
              onChange={handleCategoryChange}
            >
              {postcategories.map((country, index) => (
                <MenuItem key={index} value={country.countryName}>
                  {country.countryName}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: { xs: "none", sm: "unset" }, width: "100%" }}>
              <SearchTitle />
            </Box>
            <Link href="/createtopic">
              <Button
                disableElevation
                sx={{ ml: 1 }}
                variant="contained"
                size="small"
                fullWidth
                component="a"
              >
                Create a Topic
              </Button>
            </Link>
          </Stack>
          {posts ? (
            <Stack spacing={1} sx={{ minHeight: "500px" }}>
              {posts.map((post, index) => (
                <ForumCard post={post} key={index} />
              ))}
              {posts.length === 0 && (
                <Stack alignItems="center" alignContent="center">
                  <Typography sx={{ mt: "50%" }} variant="h4">
                    Sorry No posts Here
                  </Typography>
                </Stack>
              )}
            </Stack>
          ) : (
            <>
              {[1, 2, 3, 4].map((i, index) => (
                <ForumCardSkeleton key={index} />
              ))}
            </>
          )}
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Pagination
          disabled={!posts}
          size="large"
          page={page}
          onChange={handlePagination}
          count={pageCount}
          color="primary"
        />
      </Stack>
    </Stack>
  );
}
