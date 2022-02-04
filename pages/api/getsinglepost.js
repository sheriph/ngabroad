import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// @ts-ignore
const client = new MongoClient(uri, clientOptions);

export default async function handler(req, res) {
  try {
    await client.connect();
    const query = { slug: req.body.slug };
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: { discussionThread: 1, id: 1 },
    };
    const post = await client
      .db("ngabroad")
      .collection("posts")
      .findOne(query, options);

    res.status(200).json(post);
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await client.close();
  }
}
