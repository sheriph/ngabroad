import { Button } from "@mui/material";
import { migrateAllPosts } from "../lib/api";
import axios from "axios";
import { useState } from "react";

export default function Migrator() {
  const [data, setData] = useState([{ a: 1 }]);
  const migrator = async () => {
    try {
      let slugs = [];
      let endCursor;
      let totalSlug = 1;
      for (let i = 0; i < totalSlug; i++) {
        console.log("i", i, endCursor, totalSlug, slugs);
        const response = await migrateAllPosts(endCursor);
        slugs = slugs.concat(response.nodes);
        endCursor = response.pageInfo.endCursor;
        //  if (i === 0) totalSlug = Math.ceil(response.pageInfo.total / 100);
      }
      console.log("posts", slugs);
      setData(slugs);
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendToDb = async () => {
    //  console.log("data", data);
    try {
      console.log("uploading ...");
      const upload = await axios.get("/api/bulkwrite");
      console.log("upload", upload);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPaths = async () => {
    //  console.log("data", data);
    try {
      console.log("uploading ...");
      const paths = await axios.get("/api/getpaths");
      console.log("paths", paths.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getStaticPaths = async (pageNumber) => {
    try {
      const fetching = await fetch("/api/getpaginatedposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageNumber: pageNumber,
        }),
      });
      const posts = await fetching.json();
      return posts;
    } catch (error) {
      console.log("error", error);
    }
  };

  // console.log("data", data);

  return (
    <>
      <Button onClick={migrator}>MIGRATE</Button>
      <Button onClick={sendToDb}>Send TO DB</Button>
      <Button onClick={getStaticPaths}>Get Paths</Button>
    </>
  );
}
