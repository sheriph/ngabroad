/* import { db } from "../../../component/lib"; */

/* const mysql = require("mysql");

export const db = mysql.createConnection({
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
}); */

import { query } from "../../../component/lib";



export default async function getSchools(req, res) {
  const { country, field, level /* page */ } = req.body;
  console.log(country, field, level);
  try {
    const results = await query(
      `SELECT * FROM jicdata WHERE country = "${country}" AND level = "${field}" AND selection6 LIKE "%${level}%"`
    );
    res.send({ results });
    //return res.json(results);
  } catch (e) {
    res.send({ message: e.message });
    //res.status(500).json({ message: e.message });
  }
}
