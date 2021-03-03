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

const BlogCard = () => {
  const classes = styles();
  return (
    <Grid component={Paper} container spacing={2} className={classes.blogcard}>
      <Grid item container style={{ position: "relative" }}>
        <img
          //  layout="intrinsic"
          src="/images/wedding.jpeg"
          width="100%"
          height="auto"
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
            left: "5px",
            textTransform: "none",
          }}
        >
          Study Abroad
        </Button>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      >
        <Grid item xs={12} style={{ paddingLeft: "15px" }}>
          <Typography>How to attend a wedding event in nigeria</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <MoreOutlined style={{ transform: "rotate(180deg)" }} />
              }
              style={{ left: "5px", textTransform: "none" }}
            >
              Read More
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogCard;
