import mysql2 from 'mysql2';

let pool = null;

// creates a shared connection to the database
export const connectToDatabase = () => {
  pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
  }).promise();
  console.log('created database pool');
};

// gets a handle on the shared database pool
export const db = () => {
  return pool;
};