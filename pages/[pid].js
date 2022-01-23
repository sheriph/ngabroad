import axios from "axios";
import React, { useEffect, useState } from "react";
import SinglePost from "../component/postcomponent";
import { SleekTheme } from "../component/themes";
import {
  getAllPostsSlugs,
  getSinglePost,
  getSingleRelatedPost,
} from "../lib/api";
import { useAmp } from "next/amp";

export const config = { amp: false };

export default function Article({ post }) {
  const isAmp = useAmp();
  const [relatedPosts, setRelatedPosts] = useState([]);

  const {
    content,
    title,
    categories: { nodes: categoryList },
    seo,
    databaseId,
  } = post;

  let sourceUrl = "";
  let altText = "";
  let width = "";
  let height = "";

  try {
    sourceUrl = post.featuredImage.node.sourceUrl;
    altText = post.featuredImage.node.altText;
    height = post.featuredImage.node.mediaDetails.height;
    width = post.featuredImage.node.mediaDetails.width;
  } catch (error) {
    console.log("featureImage error in ", title, error);
    sourceUrl = "/images/placeholder";
    altText = `${Math.random()}`;
    width = "640";
    height = "458";
  }

  const fetcher = async () => {
    try {
      const yarpp = await axios.get(
        `https://naijagoingabroad.com.ng/wp-json/yarpp/v1/related/${databaseId}`
      );

      const res = yarpp.data;

      let relatedPosts = [];

      for (let i = 0; i < res.length; i++) {
        try {
          const post = await getSingleRelatedPost(res[i].slug);
          relatedPosts.push(post);
        } catch (error) {
          console.log("fetch post error", error);
          return;
        }
      }
      console.log("relatedPosts", relatedPosts);
      setRelatedPosts(relatedPosts);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    fetcher();
  }, [null]);

  return (
    <SleekTheme
      isAmp={isAmp}
      subtitle={categoryList.map((item) => item.name).toString()}
      seo={seo}
      jsx={
        <SinglePost
          isAmp={isAmp}
          content={content}
          relatedPosts={relatedPosts}
          sourceUrl={sourceUrl}
          altText={altText}
          height={height}
          width={width}
        />
      }
      title={title}
    />
  );
}

export async function getStaticPaths() {
  let after = "null";
  let allNodes = [];
  for (let i = 0; i < 100; i++) {
    const posts = await getAllPostsSlugs(after);
    allNodes = allNodes.concat(posts.nodes);
    after = posts.pageInfo.endCursor;
    if (posts.pageInfo.hasNextPage) {
      continue;
    } else {
      break;
    }
  }
  const paths = allNodes.map((post) => ({ params: { pid: post.slug } }));

  // const paths = [{ params: { pid: "america-us-student-visa-nigeria" } }];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    // console.log("params", params);

    let post = await getSinglePost(params.pid);
    /* const databaseId = post.databaseId;
    let yarpp = [];
    // console.log("databaseId", databaseId);
    await axios
      .get(
        `https://naijagoingabroad.com.ng/wp-json/yarpp/v1/related/${databaseId}`
      )
      .then((response) => {
        // console.log("yarp response", response.data);
        yarpp = yarpp.concat(response.data);
      })
      .catch((err) => console.error("yarp error", err));

    // console.log("yarp", yarpp);

    let relatedPosts = [];

    for (let i = 0; i < yarpp.length; i++) {
      const post = await getSingleRelatedPost(yarpp[i].slug);
      //  console.log("post", post);
      relatedPosts.push(post);
    } */
    let relatedPosts = [];
    post = { ...post, relatedPosts: relatedPosts };
    return { props: { post } };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
}
