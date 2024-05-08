const Pool = require('pg').Pool
const pool = new Pool(
    {
        user: "postgres",
        password: "p.postgres",
        host: "localhost",
        port: 5432,
        database: "postgres_db"
    }
)

module.exports = pool