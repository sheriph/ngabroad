import { query } from "../../../component/lib";

export default async function getFilter(req, res) {
  try {
    const results = await query(`SELECT DISTINCT country FROM jicdata; SELECT DISTINCT level FROM jicdata ; SELECT DISTINCT selection6
    FROM jicdata`);
    res.status(200).send({ results });
    //return res.json(results);
  } catch (e) {
    res.status(400).send({ message: e.message });
    //res.status(500).json({ message: e.message });
  }
}
