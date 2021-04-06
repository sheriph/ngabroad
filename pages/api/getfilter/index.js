/* import { db } from "../../../component/lib"; */

import { query } from "../../../component/lib";

/* const mysql = require("mysql");

export const db = mysql.createConnection({
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
}); */

/* export default function getFilter(req, res) {
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
 */

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
