// @ts-nocheck
import { Box, Container, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import ReactHtmlParser, { processNodes } from "react-html-parser";
import AdblockNotifications from "./adsblockernotification";
import GoogleAds from "./googleads";
import Modal2 from "./modal2";

const BlogCard = dynamic(() => import("./blogcard"));

const ForumPostContent = (props) => {
  const { content, postReplied, isAmp, sourceUrl, altText, width, height } =
    props;


  const transform = (node, index) => {
    if (node.type === "tag" && node.name === "h2") {
      return (
        <Typography
          sx={{ marginTop: "15px", marginBottom: "15px" }}
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
          sx={{
            my: 2,
            width: "70%",
            height: "70%",
            mx: "auto",
          }}
          display="block"
          justifyContent="center"
          key={index}
        >
          <Image
            src={src}
            alt={alt}
            width="100%"
            height="100%"
            layout="responsive"
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

  return (
    <Box
      sx={{
        borderLeft: postReplied ? 5 : 0,
        pl: postReplied ? 2 : 0,
        borderColor: "primary.main",
      }}
    >
      {ReactHtmlParser(content, options)}
    </Box>
  );
};

export default ForumPostContent;
