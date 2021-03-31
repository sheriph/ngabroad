// @ts-nocheck
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";
import SinglePost from "../component/postcomponent";
import { SleekTheme } from "../component/themes";
import {
  getAllPostsSlugs,
  getSinglePost,
  getSingleRelatedPost,
} from "../lib/api";
import { useAmp } from "next/amp";

const styles = makeStyles((theme) => ({}));

export const config = { amp: "hybrid" };

export default function ({ post }) {
  const isAmp = useAmp();

  console.log("isAmp", isAmp);
  const {
    content,
    title,
    categories: { nodes: categoryList },
    relatedPosts,
    seo,
  } = post;
  return (
    <SleekTheme
      isAmp={isAmp}
      subtitle={categoryList.map((item) => item.name).toString()}
      seo={seo}
      jsx={<SinglePost content={content} relatedPosts={relatedPosts} />}
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

  //console.log("allNodes", allNodes);

  const paths = allNodes.map((post) => {
    return { params: { pid: post.slug } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // console.log("params", params);

  let post = await getSinglePost(params.pid);
  const databaseId = post.databaseId;
  let yarpp = [];
  // console.log("databaseId", databaseId);
  await axios
    .get(`https://naijagoingabroad.com/wp-json/yarpp/v1/related/${databaseId}`)
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
  }

  post = { ...post, relatedPosts: relatedPosts };
  return { props: { post }, revalidate: 1 };
}
