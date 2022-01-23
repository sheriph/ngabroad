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
    const query = { "formData.orderNumber": req.body.orderNumber };
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: {},
    };
    const order = await client
      .db("ngabroad")
      .collection("orders")
      .findOne(query, options);

    res.status(200).json(order);
  } catch (err) {
    console.log(`err`, err);
    res.status(400).json(err);
  } finally {
    console.log(`closing connection`);
    await client.close();
  }
}
