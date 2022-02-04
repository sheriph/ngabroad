import { getAllForDiscussion } from "../../lib/api";

export default async function handler(req, res) {
  try {
    const page = req.body.page;
    console.log("page", page);
    let response;
    let endCursor;
    for (let i = 0; i < page; i++) {
      console.log("i", i, endCursor);
      response = await getAllForDiscussion(endCursor);
      endCursor = response.pageInfo.endCursor;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
  }
}
