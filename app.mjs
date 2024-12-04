// Import required classes from Sequelize for database connection and table schema setup.
// `Sequelize`: Used to establish a connection with the database.
// `DataTypes`: Helps define the data structure (column types) for tables.
// `Model`: A base class to create table models in Sequelize.
// the "{}". these specific classess from 
// Sequelize that we're using to create the Table Schema
import {Sequelize} from 'sequelize';

// Import dotenv to load environment variables from the .env file.
import dotenv from 'dotenv';

// Load environment variables into process.env.
dotenv.config();

// Debug: Check if environment variables are loaded correctly.
console.log("DEBUG::PROCESS_ENV", process.env.DB_NAME, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD);


// Passing parameters separately (other dialects)
// Use the .dotenv file for the database, username, and password
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });

// Test the connection
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connection to the database:', error);
}

// Syncing to the database
sequelize.sync({force: true }).then(() => {
  console.log('Database Synced');
});

 // Show the tables in the database
(async () => {
  try {
    const [results] = await sequelize.query("SHOW TABLES");
    console.log("Tables in the database:", results);
  } catch (error) {
    console.error("Error fetching tables:", error.message);
  }
})();

  