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
    const { postId, commentId, currentCount, email } = req.body;
    console.log(
      "postId, commentId, currentCount",
      postId,
      commentId,
      currentCount
    );
    const findLikesQuery = { email: email, myLikes: { $in: [commentId] } };
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: { myLikes: 1 },
    };

    //find if likes before

    const userData = await client
      .db("ngabroad")
      .collection("users")
      .find(findLikesQuery, options).count()
    console.log("userData", userData);
    if (userData) {
      throw new Error("Already liked the post");
    }

    await session.withTransaction(async () => {
      //now update user data

      const userUpdateOperation = {
        $push: { myLikes: commentId },
      };

      await client
        .db("ngabroad")
        .collection("users")
        .updateOne(findLikesQuery, userUpdateOperation, { session });

      // now update likes

      const query = { id: postId, "discussionThread.id": commentId };
      const updateOperation = {
        $set: { "discussionThread.$.likesCount": currentCount + 1 },
      };

      await client
        .db("ngabroad")
        .collection("posts")
        .findOneAndUpdate(query, updateOperation, { session });
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
