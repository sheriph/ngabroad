// @ts-nocheck
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import ReactHtmlParser, { processNodes } from "react-html-parser";
import GoogleAds from "./googleads";

const BlogCard = dynamic(() => import("./blogcard"));

const SinglePost = (props) => {
  const {
    content,
    relatedPosts,
    isAmp,
    sourceUrl,
    altText,
    width,
    height,
  } = props;


  const transform = (node, index) => {
    if (node.type === "tag" && node.name === "h2") {
      return (
        <Typography variant="h5" align="center" component="h2" key={index}>
          {processNodes(node.children, transform)}
        </Typography>
      );
    }

    if (node.type === "tag" && node.name === "p") {
      const isOdd = (n) => n % 2 === 1;
      if (isAmp) {
        return (
          <Typography variant="body1" component="p" key={index}>
            {processNodes(node.children, transform)}
          </Typography>
        );
      }
      
      if (!isAmp) {
        if (isOdd(index)) {
          return (
            <Typography variant="body1" component="p" key={index}>
              {processNodes(node.children, transform)}
              <GoogleAds />
            </Typography>
          );
        } else {
          return (
            <Typography variant="body1" component="p" key={index}>
              {processNodes(node.children, transform)}
            </Typography>
          );
        }
      }
    }

    if (node.type === "tag" && node.name === "img") {
      const { src, alt, width, height } = node.attribs;
      if (isAmp)
        return (
          <amp-img
            key={index}
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout="responsive"
          ></amp-img>
        );
      return (
        <Box display="flex" justifyContent="center" key={index}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout="intrinsic"
          />
        </Box>
      );
    }

    if (node.type === "tag" && node.name === "iframe") {
      // console.log("node", node);
      let { src, width, height } = node.attribs;

      if (!isAmp) {
        return (
          //  <Container>
          <iframe
            key={index}
            width="auto"
            height={height}
            src={src}
            frameBorder="0"
          ></iframe>
          //   </Container>
        );
      }

      if (isAmp) {
        if (!src.includes("https")) {
          src = `https:${src}`;
        }
        //frameborder:
        return (
          <amp-iframe
            width={width}
            height={height}
            layout="responsive"
            sandbox="allow-scripts allow-same-origin"
            src={src}
            frameborder="0"
          >
            <amp-img
              layout="fill"
              src="/images/iframeloading336x297.gif"
              placeholder
            ></amp-img>
          </amp-iframe>
        );
      }
    }
  };

  const options = {
    decodeEntities: true,
    transform,
  };





  

  return (
    <Container disableGutters style={{ marginTop: "20px" }}>
      <Grid container>
        {isAmp ? (
          <Grid item container justify="center" style={{ display: "block" }}>
            <Grid item>
              <amp-img
                src={sourceUrl}
                alt={altText}
                width={width}
                height={height}
                layout="responsive"
              ></amp-img>
            </Grid>
          </Grid>
        ) : (
          <Grid item container justify="center">
            <Grid item>
              <Image
                src={sourceUrl}
                alt={altText}
                width={width}
                height={height}
                layout="intrinsic"
              />
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          {/* <Box
            className={classes.root}
            dangerouslySetInnerHTML={{ __html: content }}
          /> */}
          {ReactHtmlParser(content, options)}
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
