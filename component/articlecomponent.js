import { Container, Grid, Hidden, makeStyles } from "@material-ui/core";
import React from "react";
import BlogCard from "./blogcard";
import SearchForm from "./search";

const styles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(2),
  },
}));

const ArticleComponent = () => {
  const classes = styles();
  const posts = [1, 2, 3, 4, 5];
  return (
    <Grid container className={classes.gridContainer}>
      <Hidden xsDown>
        <Grid item>SIDE BAR GOES HERE</Grid>
      </Hidden>
      <Grid item xs>
        <Grid container>
          <Grid item container justify="center">
            <Grid item>
              <SearchForm />
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={5}
            style={{ marginTop: "20px", marginBottom: "40px" }}
          >
            {posts.map((post, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <BlogCard />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArticleComponent;
