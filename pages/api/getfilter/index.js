import { db } from "../../../component/lib";

export default function getFilter(req, res) {
  db.query(
    `SELECT DISTINCT country FROM jicdata; SELECT DISTINCT level FROM jicdata ; SELECT DISTINCT selection6
    FROM jicdata`,
    (error, results, fields) => {
      if (results) {
        db.end();
        res.status(200).send({ error, results });
      } else if (error) {
        db.end();
        res.status(400).send({ error, results });
      }
    }
  );
}
