// @ts-nocheck
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { BookmarksOutlined, MoreOutlined } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { lowerCase, startCase } from "lodash";

const BlogCard = ({
  isAmp,
  sourceUrl,
  altText,
  slug,
  title,
  width,
  height,
  categoryList,
}) => {
  return (
    <Stack component={Paper} sx={{ mb: 5 }} spacing={2}>
      <Stack sx={{}}>
        {isAmp ? (
          <amp-img
            src={sourceUrl}
            width="300"
            height="250"
            layout="responsive"
            alt={altText}
          ></amp-img>
        ) : (
          <Image
            src={sourceUrl}
            alt={altText}
            width="auto"
            height="auto"
            layout="responsive"
          />
        )}
        <Button
          size="small"
          variant="contained"
          disableElevation
          // color="primary"
          sx={{ position: "absolute", fontSize: "10px" }}
          startIcon={<BookmarksOutlined />}
        >
          {categoryList.map((category) =>
            startCase(lowerCase(category.name).toString())
          )}
        </Button>
      </Stack>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Typography sx={{ px: 2, height: "50px" }}>{title}</Typography>

        <Stack>
          <Stack>
            {isAmp ? (
              <a
                style={{ textDecoration: "none" }}
                href={`/${encodeURIComponent(slug)}`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={
                    <MoreOutlined style={{ transform: "rotate(180deg)" }} />
                  }
                  style={{ textTransform: "none" }}
                >
                  Read More
                </Button>
              </a>
            ) : (
              <Link
                passHref
                prefetch={false}
                href={`/${encodeURIComponent(slug)}`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={
                    <MoreOutlined style={{ transform: "rotate(180deg)" }} />
                  }
                  style={{ textTransform: "none" }}
                  component="a"
                >
                  Read More
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BlogCard;
