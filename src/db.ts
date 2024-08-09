// Utility to test DB connection
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(
  "./db/vm-co-948_North.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the 948 North database.");
  }
);

db.serialize(() => {
  db.each(
    `SELECT id as id,
        name as name
    FROM stock`,
    (err, row: { id: String; name: String }) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    }
  );
});

db.close();
