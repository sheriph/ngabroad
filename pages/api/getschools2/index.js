import { query } from "../../../component/lib";

export default async function getSchools2(req, res) {
  const { country, field, level /* page */ } = req.body;
  console.log(country, field, level);
  try {
    const results = await query(
      `SELECT * FROM ${country.toLocaleLowerCase()} WHERE level = "${level}" AND field = "${field}"`
    );
    res.send({ results });
    //return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
    //res.status(500).json({ message: e.message });
  }
}
