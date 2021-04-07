import mysql from "serverless-mysql";

/* export const db = mysql({
  config: {
    multipleStatements: true,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    database: process.env.NEXT_PUBLIC_DB,
  },
}); */

export const db = mysql({
  config: {
    multipleStatements: true,
    host: "naijagoingabroad.com.ng",
    user: "u904780435_sheriph",
    password: "Khashef2017.",
    database: "u904780435_jic",
  },
});

export async function query(q, values) {
  try {
    const results = await db.query(q, values);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

/* export async function query(q) {
  try {
    const results = await db.query(q, values);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
} */
/* 
app.post("/canadaschoools", (req, res) => {
  const db = mysql.createConnection({
    host: "naijagoingabroad.com",
    user: "naijagoi_sheriph",
    password: "Khashef2017.",
    database: "naijagoi_studyabroad",
  });

  db.query("SELECT * FROM `cyprus_schools`", (error, results, fields) => {
    db.end();
    res.send({ error, results });
  });
});

app.post("/field", (req, res) => {
  const { name: dbname } = req.body;
  console.log(dbname);
  const db = mysql.createConnection({
    host: "naijagoingabroad.com",
    user: "naijagoi_sheriph",
    password: "Khashef2017.",
    database: "naijagoi_studyabroad",
  });

  db.query(
    `SELECT DISTINCT department FROM ${dbname}`,
    (error, results, fields) => {
      if (results) {
        db.end();
        res.send({ error, results });
      } else if (error) {
        db.end();
        res.status(400).send(error);
      }
    }
  );
});

app.post("/level", (req, res) => {
  const { name: dbname } = req.body;
  console.log(dbname);
  const db = mysql.createConnection({
    host: "naijagoingabroad.com",
    user: "naijagoi_sheriph",
    password: "Khashef2017.",
    database: "naijagoi_studyabroad",
  });

  db.query(`SELECT DISTINCT Type FROM ${dbname}`, (error, results, fields) => {
    if (results) {
      db.end();
      res.send({ error, results });
    } else if (error) {
      db.end();
      res.status(400).send(error);
    }
  });
});

app.post("/options", (req, res) => {
  const { name: dbname } = req.body;
  console.log(dbname);
  const db = mysql.createConnection({
    multipleStatements: true,
    host: "naijagoingabroad.com",
    user: "naijagoi_sheriph",
    password: "Khashef2017.",
    database: "naijagoi_studyabroad",
  });

  db.query(
    `SELECT DISTINCT department FROM ${dbname} ; SELECT DISTINCT Type FROM ${dbname}`,
    (error, results, fields) => {
      if (results) {
        db.end();
        res.send({ error, results });
      } else if (error) {
        db.end();
        res.status(400).send(error);
      }
    }
  );
});

app.post("/schools", (req, res) => {
  const {
    dbname: { name },
    field: department,
    level: Type,
    page,
  } = req.body;
  console.log(name, department, Type, page);
  const offset = (page - 1) * 20;
  const db = mysql.createConnection({
    multipleStatements: true,
    host: "naijagoingabroad.com",
    user: "naijagoi_sheriph",
    password: "Khashef2017.",
    database: "naijagoi_studyabroad",
  });

  db.query(
    `SELECT * FROM ${name} WHERE Type = "${Type}" AND department = "${department}" LIMIT ${offset},20 ; SELECT COUNT(*) FROM ${name} WHERE Type = "${Type}" AND department = "${department}"`,
    (error, results, fields) => {
      console.log(results);
      if (results) {
        db.end();
        res.send({ error, results });
      } else if (error) {
        db.end();
        res.status(400).send(error);
      }
    }
  );
});
 */
