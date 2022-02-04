import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// @ts-ignore
const client = new MongoClient(uri, clientOptions);

export default async function handler(req, res) {
  await client.connect();
  const session = client.startSession();
  
  try {
    const { email, slug, comment } = req.body;
    console.log(`req.body`, req.body);

    const updateUserCommentQuery = { email: email };
    const updateUserCommentOptions = {
      $push: { comments: comment },
    };

    const updateThreadQuery = { slug: slug };
    const updateThreadOptions = {
      $push: { discussionThread: comment },
    };

    await session.withTransaction(async () => {
      const usersCol = client.db("ngabroad").collection("users");
      const postsCol = client.db("ngabroad").collection("posts");
      await usersCol.updateOne(
        updateUserCommentQuery,
        updateUserCommentOptions,
        { session }
      );
      await postsCol.updateOne(updateThreadQuery, updateThreadOptions, {
        session,
      });
    });
    res.status(200).json(true);
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await session.endSession();
    await client.close();
  }
}
