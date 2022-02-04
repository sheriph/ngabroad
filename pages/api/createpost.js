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
  console.log("req.body", req.body);

  try {
    const { content, title, categories, slug, email } = req.body;
    console.log("req.body", req.body);
    const findExistingSlugQuery = { slug: slug };
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: { slug: 1 },
    };

    await client.connect();

    const slugs = await client
      .db("ngabroad")
      .collection("posts")
      .find(findExistingSlugQuery, options)
      .count();
    console.log("slugs", slugs);
    const findAuthorQuery = { email: email };
    const authorOptions = {
      // sorting
      sort: {},
      //what to return
      projection: { _id: 0 },
    };

    const author = await client
      .db("ngabroad")
      .collection("users")
      .findOne(findAuthorQuery, authorOptions);
    console.log("author", author);
    const modifiedSlugs = slugs
      ? `${slug}-${Math.floor(Math.random() * 1000 * 10000)}`
      : slug;

    const post = {
      content,
      title,
      categories,
      slug: modifiedSlugs,
      modified: null,
      author,
      date: new Date(),
      id: generateId(),
    };
    const postWithDiscussionThread = {
      ...post,
      discussionThread: [{ ...post }],
    };

    console.log("postWithDiscussionThread", postWithDiscussionThread);

    const insert = await client
      .db("ngabroad")
      .collection("posts")
      .insertOne({ ...postWithDiscussionThread });

    const userUpdateOperation = {
      $push: { posts: { ...postWithDiscussionThread } },
    };

    await client
      .db("ngabroad")
      .collection("users")
      .updateOne(findAuthorQuery, userUpdateOperation);

    res.status(200).json("insert.acknowledged");
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await client.close();
  }
}
