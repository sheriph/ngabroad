// @ts-nocheck
import { Container, Grid, Hidden, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useRouter } from "next/router";
import React from "react";
import LazyLoad from "react-lazyload";
import { getAllPosts } from "../lib/api";
import BlogCard from "./blogcard";
import SearchForm from "./search";

const styles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const ArticleComponent = (props) => {
  const { posts, count, allTitles } = props;
  const classes = styles();
  const postsArr = new Array(10).fill("6");
  const router = useRouter();
  // console.log(posts, count);

  if (!posts) return <> Loading</>;
  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs>
        <Grid container>
          <Grid item container justify="center">
            <Grid item>
              <SearchForm allTitles={allTitles} />
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
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justify="center">
        <Grid item>
          <Pagination
            onChange={(e, page) => {
              router.push(`/articles/${page}`);
            }}
            count={10}
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArticleComponent;
