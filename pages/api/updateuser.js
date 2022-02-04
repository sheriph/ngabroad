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

  try {
    const { firstName, lastName, username, email, avatar } = req.body;
    console.log("req.body", req.body);
    const findUserQuery = {
      email: email,
    };
    const updateOperation = {
      $set: { ...req.body },
    };

    await client
      .db("ngabroad")
      .collection("users")
      .findOneAndUpdate(findUserQuery, updateOperation);

    res.status(200).json(true);
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await client.close();
  }
}
