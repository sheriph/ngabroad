import { Grid, makeStyles } from "@mui/material";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import BlogCard from "./blogcard";
import SearchForm from "./search";

const ArticleComponent = (props) => {
  const { posts, count, allTitles, isAmp } = props;
  const postsArr = new Array(10).fill("6");
  const router = useRouter();
  // console.log(posts, count);

  if (!posts) return <> Loading</>;
  return (
    <Grid container>
      <Grid item xs>
        <Grid container>
          <Grid item container justifyContent="center">
            <Grid sx={{ mt: 2, width: "100%" }} item>
              <SearchForm allTitles={allTitles} />
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ mt: 1, mb: 2 }}>
            {posts.map((post, index) => {
              const { title, slug, categories } = post;

              let categoryList = [{ name: "" }];

              try {
                categoryList = categories.nodes;
              } catch (error) {
                console.log("category error in ", title, error);
              }

              // console.log("post", post);
              let sourceUrl = "";
              let altText = "";
              // let width = "";
              //  let height = "";

              try {
                sourceUrl = post.featuredImage.node.sourceUrl;
                altText = post.featuredImage.node.altText;
                // height = post.featuredImage.node.mediaDetails.height;
                //  width = post.featuredImage.node.mediaDetails.width;
              } catch (error) {
                console.log("featureImage error in ", title, error);
                sourceUrl = "/images/placeholder";
                altText = `${Math.random()}`;
                {
                  /*     width = "640";
                height = "458"; */
                }
              }

              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <BlogCard
                    isAmp={isAmp}
                    //  post={post}
                    sourceUrl={sourceUrl}
                    altText={altText}
                    height={350}
                    width={650}
                    title={title}
                    slug={slug}
                    categoryList={categoryList}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Pagination
            onChange={(e, page) => {
              router.push(`/articles/${page}`);
            }}
            count={count}
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArticleComponent;
