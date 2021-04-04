// @ts-nocheck
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import { lazy, useEffect } from "react";
import dynamic from "next/dynamic";

const BlogCard = dynamic(() => import("./blogcard"));

const styles = makeStyles((theme) => ({
  root: {
    img: {
      //   width: "100%",
    },
    "&.MuiBox-root img": {
      width: "100%",
      height: "auto",
      /*    position: "relative",
      transform: "translateX(-50%)",
      left: "50%", */

      //  maxHeight: "300px",
    },
    "&.MuiBox-root a": {
      display: "inline-block !important",
      // overflow: "scroll",
    },
  },
}));

const SinglePost = (props) => {
  const classes = styles();
  // console.log(post);

  const {
    content,
    relatedPosts,
    isAmp,
    sourceUrl,
    altText,
    width,
    height,
  } = props;
  // console.log(content);
  let renderContent = "";

  if (isAmp && content) {
    let imgFinder = /<img([\w\W]+?)[\/]?>/;
    let matches = content.match(imgFinder);
    // console.log("matches", matches)
    let filteredMatch = matches.filter((item) => item.includes("<img"));
    console.log("filteredMatch", filteredMatch);
    filteredMatch.forEach((item) => {
      renderContent = item.replace(
        item,
        `<i-amphtml-sizer-intrinsic>${item}</i-amphtml-sizer-intrinsic>`
      );
    });
  }
  // console.log("content", content);

  useEffect(() => {
    let introImg = window.document.querySelector("img");
    introImg.style.left = "50%";
    introImg.style.position = "relative";
    introImg.style.transform = "translateX(-50%)";
  }, [null]);

  return (
    <Container disableGutters style={{ marginTop: "20px" }}>
      <Grid container>
        <Grid item container justify="center">
          <Grid item>
            {/* <img src={sourceUrl} alt={altText} /> */}
            <Image
              src={sourceUrl}
              alt={altText}
              width={width}
              height={height}
              layout="intrinsic"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box
            className={classes.root}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Grid>

        <Grid
          item
          container
          spacing={5}
          style={{ marginTop: "30px", marginBottom: "40px" }}
          justify="center"
        >
          {relatedPosts.length > 0 && (
            <Grid item xs={12}>
              <Typography align="center">Related Posts</Typography>
            </Grid>
          )}
          {relatedPosts.map((post, index) => {
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
            //   let width = "";
            //   let height = "";

            try {
              sourceUrl = post.featuredImage.node.sourceUrl;
              altText = post.featuredImage.node.altText;
              //  height = post.featuredImage.node.mediaDetails.height;
              //   width = post.featuredImage.node.mediaDetails.width;
            } catch (error) {
              console.log("featureImage error in ", title, error);
              sourceUrl = "/images/placeholder";
              altText = `${Math.random()}`;
              //  width = "640";
              //  height = "458";
            }

            return (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <BlogCard
                  isAmp={isAmp}
                  post={post}
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
    </Container>
  );
};

export default SinglePost;
