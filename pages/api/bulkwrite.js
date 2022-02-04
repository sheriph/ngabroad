import { MongoClient } from "mongodb";
import { generateId } from "../../component/utilityfx";
import { migrateAllPosts } from "../../lib/api";
const uri = process.env.MONGODB_URI;
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// @ts-ignore
const client = new MongoClient(uri, clientOptions);

export default async function handler(req, res) {
  // console.log("req.body", req.body);

  let slugs = [];
  let endCursor;
  let totalSlug = 4;
  for (let i = 0; i < totalSlug; i++) {
    //  console.log("i", i, endCursor, totalSlug, slugs);
    const response = await migrateAllPosts(endCursor);
    slugs = slugs.concat(response.nodes);
    endCursor = response.pageInfo.endCursor;
  }

  console.log("SERVER");
  // const posts = JSON.parse(req.body.posts);
  console.log("posts", slugs.length);
  const posts = slugs.map((slug) => ({
    ...slug,
    categories: ["Nigeria"],
    author: { ...slug.author.node },
    id: generateId(),
  }));

  const postsWithThread = posts.map((post) => ({
    ...post,
    discussionThread: [{ ...post }],
  }));

  try {
    await client.connect();
    console.log("running 1");
    const response = await client
      .db("ngabroad")
      .collection("posts")
      .insertMany([...postsWithThread.reverse()]);

    res.status(200).json(response);
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await client.close();
  }
}
