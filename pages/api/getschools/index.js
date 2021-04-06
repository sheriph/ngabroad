/* import { db } from "../../../component/lib"; */

const mysql = require("mysql");

export const db = mysql.createConnection({
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

export default function getSchools(req, res) {
  const { country, field, level /* page */ } = req.body;
  console.log(country, field, level);
  db.query(
    `SELECT * FROM jicdata WHERE country = "${country}" AND level = "${field}" AND selection6 LIKE "%${level}%"`,
    (error, results, fields) => {
      if (results) {
        db.end();
        //   console.log(results);
        res.send({ error, results });
      } else if (error) {
        db.end();
        res.send({ error, results });
      }
    }
  );
}
