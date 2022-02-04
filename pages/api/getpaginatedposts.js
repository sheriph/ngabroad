import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// @ts-ignore
const client = new MongoClient(uri, clientOptions);

export default async function handler(req, res) {
  const nPerPage = 20;
  console.log("req.body", req.body);
  const { pageNumber, category } = req.body;
  try {
    await client.connect();

    const query = category ? { categories: { $in: [category] } } : {};
    const options = {
      // sorting
      sort: { _id: -1 },
      //what to return
      projection: {
        slug: 1,
        title: 1,
        date: 1,
        author: 1,
        commentCount: 1,
        likesCount: 1,
        dislikesCount: 1,
      },
    };
    const posts = await client
      .db("ngabroad")
      .collection("posts")
      // @ts-ignore
      .find(query, options)
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage)
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
