// @ts-nocheck
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { BookmarksOutlined, MoreOutlined } from "@material-ui/icons";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const styles = makeStyles((theme) => ({
  buttoncategory: {
    backgroundColor: theme.palette.primary.light,
    opacity: "0.7",
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

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
  const classes = styles();

  return (
    <Grid component={Paper} container spacing={2}>
      <Grid item container style={{ position: "relative", display: "block" }}>
        {isAmp ? (
          <amp-img
            src={sourceUrl}
            width="300"
            height="250"
            layout="responsive"
            alt={altText}
          ></amp-img>
        ) : (
          <span style={{ maxHeight: "450px" }}>
            <Image
              src={sourceUrl}
              alt={altText}
              width={width}
              height={height}
              layout="intrinsic"
            />
          </span>
        )}
        <Button
          size="small"
          variant="text"
          // color="primary"

          className={classes.buttoncategory}
          startIcon={<BookmarksOutlined />}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            textTransform: "none",
            fontSize: "8px",
            borderRadius: "0",
          }}
        >
          {categoryList.map((category) => category.name).toString()}
        </Button>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      >
        <Grid item xs={12} style={{ paddingLeft: "15px" }}>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item container>
          <Grid item>
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogCard;
