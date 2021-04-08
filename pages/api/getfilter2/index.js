import { query } from "../../../component/lib";

export default async function getFilter2(req, res) {
  try {
      //  its assumed that usa has all level and field 
    const results = await query(
      `SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = 'u904780435_jic' AND TABLE_NAME <> 'jicdata' ; SELECT DISTINCT field FROM u904780435_jic.usa WHERE field <> "" ; SELECT DISTINCT level FROM u904780435_jic.usa WHERE field <> ""`
    );
    res.status(200).send({ results });
    //return res.json(results);
  } catch (e) {
    res.status(400).send({ message: e.message });
    //res.status(500).json({ message: e.message });
  }
}
