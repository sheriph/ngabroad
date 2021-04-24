// @ts-nocheck
import { Box, Container, Grid, Typography } from "@material-ui/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactHtmlParser, { processNodes } from "react-html-parser";
import AdblockNotifications from "./adsblockernotification";
import GoogleAds from "./googleads";
import Modal2 from "./modal2";

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
        <Typography
          style={{ marginTop: "15px", marginBottom: "15px" }}
          variant="h5"
          align="center"
          component="h2"
          key={index}
        >
          {processNodes(node.children, transform)}
        </Typography>
      );
    }

    if (node.type === "tag" && node.name === "p") {
      const isOdd = (n) => n % 2 === 1;
      if (isAmp) {
        const slot = [
          "1097990250",
          "3316959485",
          "1289561944",
          "2602643619",
          "8569286164",
          "4107296975",
          "4640460077",
          "8579705086",
          "8771276779",
          "6326266205",
          "4272794417",
        ];

        if (
          isOdd(index) &&
          index > 3 &&
          processNodes(node.children, transform)
            .filter((item) => typeof item === "string")
            .toLocaleString().length > 180
        ) {
          return (
            <div key={index}>
              <Typography variant="body1" component="p" key={index}>
                {processNodes(node.children, transform)}
              </Typography>
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                <amp-ad
                  width="100vw"
                  height="320"
                  type="adsense"
                  data-ad-client="ca-pub-9023491735769338"
                  data-ad-slot={`${slot[Math.ceil(Math.random() * 10)]}`}
                  data-auto-format="rspv"
                  data-full-width=""
                >
                  <div overflow=""></div>
                </amp-ad>
              </div>
            </div>
          );
        } else {
          return (
            <Typography variant="body1" component="p" key={index}>
              {processNodes(node.children, transform)}
            </Typography>
          );
        }
      }

      if (!isAmp) {
        const slot = [
          "8519630377",
          "1584472777",
          "2131267688",
          "9212693114",
          "8199828498",
          "3061205970",
          "4657127169",
          "6868341620",
          "5778637149",
          "4242178287",
          "5587065453",
        ];

        if (
          isOdd(index) &&
          index > 3 &&
          processNodes(node.children, transform)
            .filter((item) => typeof item === "string")
            .toLocaleString().length > 180
        ) {
          return (
            <Typography variant="body1" component="p" key={index}>
              {processNodes(node.children, transform)}
              <GoogleAds slot={`${slot[Math.ceil(Math.random() * 10)]}`} />
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
          <div style={{ marginBottom: "15px", marginTop: "15px" }}>
            <amp-img
              key={index}
              src={src}
              alt={alt}
              width={width}
              height={height}
              layout="responsive"
            ></amp-img>
          </div>
        );
      return (
        <Box
          style={{ marginBottom: "15px", marginTop: "15px" }}
          display="flex"
          justifyContent="center"
          key={index}
        >
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
            key={index}
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
  const [open, setOpen] = useState(false);

  // Function called if AdBlock is not detected
  function adBlockNotDetected() {
    console.log("AdBlock is not enabled");
  }
  // Function called if AdBlock is detected
  function adBlockDetected() {
    console.log("AdBlock is enabled");
  }

  const createFuckAdBlock = () => {
    // Otherwise, you import the script FuckAdBlock
    var importFAB = document.createElement("script");
    importFAB.onload = function () {
      // If all goes well, we configure FuckAdBlock
      fuckAdBlock.onDetected(adBlockDetected);
      fuckAdBlock.onNotDetected(adBlockNotDetected);
    };
    importFAB.onerror = function () {
      // If the script does not load (blocked, integrity error, ...)
      // Then a detection is triggered
      adBlockDetected();
    };
    importFAB.integrity = "sha256-xjwKUY/NgkPjZZBOtOxRYtK20GaqTwUCf7WYCJ1z69w=";
    importFAB.crossOrigin = "anonymous";
    importFAB.src =
      "https://cdnjs.cloudflare.com/ajax/libs/fuckadblock/3.2.1/fuckadblock.min.js";
    document.head.appendChild(importFAB);
  };

  useEffect(() => {
    if (!isAmp) {
      createFuckAdBlock();
    }
  });

  return (
    <Container disableGutters style={{ marginTop: "20px" }}>
      {!isAmp && (
        <Modal2 open={open} setOpen={setOpen}>
          <AdblockNotifications />
        </Modal2>
      )}
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
