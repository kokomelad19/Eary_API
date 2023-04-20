const fs = require("fs");
const util = require("util");
const mysql = require("mysql");

const databaseConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// add database query runner method to be always promisified and use async/await with it
databaseConnection.runQuery = util.promisify(databaseConnection.query);

// GET DDL Queries
const createDatabaseTablesQueries = fs
  .readFileSync(`${__dirname}/create_tables.sql`)
  .toString()
  .trim();

// Sync tables
(async () => {
  try {
    const queries = createDatabaseTablesQueries.split(";");
    for (const query of queries) {
      if (query.length > 0) await databaseConnection.runQuery(query);
    }

    console.log("Database connected successfully 🚀🚀");
  } catch (err) {
    console.log("Error while connecting database ", err);
    throw err;
  }
})();

module.exports = databaseConnection;
