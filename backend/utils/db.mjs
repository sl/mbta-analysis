import mysql2 from 'mysql2';

let pool = null;

// creates a shared connection to the database
export const connectToDatabase = () => {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
  };
  
  pool = mysql2.createPool(config).promise();
  
  console.log('created pool with config:');
  console.log(config);
};

// gets a handle on the shared database pool
export const db = () => {
  return pool;
};