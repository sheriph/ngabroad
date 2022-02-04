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

    const query = {};
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: {
        slug: 1,
        title: 1,
      },
    };
    const posts = await client
      .db("ngabroad")
      .collection("posts")
      .find(query, options)
      .toArray();

    res.status(200).json(posts);
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await client.close();
  }
}
