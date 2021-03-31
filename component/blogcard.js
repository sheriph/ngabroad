import {
  Button,
  ButtonGroup,
  Container,
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
  blogcard: {
    //  maxWidth: "320px"
    //  marginBottom: "10px",
  },
  buttoncategory: {
    backgroundColor: theme.palette.primary.light,
    opacity: "0.7",
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

const BlogCard = ({ post }) => {
  const classes = styles();

  const {
    categories: { nodes: categoryList },
    slug,
    title,
  } = post;
  // console.log(categoryList);

  let sourceUrl = "";
  let altText = "";

  try {
    sourceUrl = post.featuredImage.node.sourceUrl;
    altText = post.featuredImage.node.altText;
  } catch (error) {
    console.log(error);
  }

  return (
    <Grid component={Paper} container spacing={2} className={classes.blogcard}>
      <Grid item container style={{ position: "relative" }}>
        <img
          //  layout="intrinsic"
          src={sourceUrl}
          width="100%"
          height="250px"
          alt={altText}
        />
        <Button
          size="small"
          variant="text"
          // color="primary"

          className={classes.buttoncategory}
          startIcon={<BookmarksOutlined />}
          style={{
            position: "absolute",
            top: "10px",
            // left: "5px",
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
            <Link href={`/${encodeURIComponent(slug)}`}>
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
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogCard;
