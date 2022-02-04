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
    const email = req.body.email;
    // console.log(`req.body`, req.body);

    await client.connect();
    const query = { email: email };
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: {},
    };
    const userData = await client
      .db("ngabroad")
      .collection("users")
      .findOne(query, options);
    console.log("userData1", userData);
    if (!userData) {
      const model = {
        email,
        username: "",
        firstName: "",
        lastName: "",
        comments: [],
        posts: [],
        avatar: "",
        role: "",
      };
      const createUser = await client
        .db("ngabroad")
        .collection("users")
        .insertOne(model);
      console.log(`createUser.acknowledged`, createUser.acknowledged);
      createUser.acknowledged
        ? res.status(200).json(model)
        : new Error("createUser failed");
    } else {
      res.status(200).json(userData);
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await client.close();
  }
}
