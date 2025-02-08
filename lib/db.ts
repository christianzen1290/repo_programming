import { Pool } from 'pg';


// Create a PostgreSQL pool connection
const pool = new Pool({
  user: process.env.DB_USER,        // Username
  host: process.env.DB_HOST,        // Host (usually 'localhost')
  database: process.env.DB_NAME,    // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: parseInt(process.env.DB_PORT || '5432'), // Port (default 5432)
});

// Export the pool to be used in other parts of the app
export { pool };
