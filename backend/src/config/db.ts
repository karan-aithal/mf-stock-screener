import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

if (!process.env.POSTGRES_URI) {
  throw new Error("POSTGRES_URI is not defined in the environment variables.");
}

console.log("Postgres URI:", process.env.POSTGRES_URI);

// Initialize Sequelize
const sequelize = new Sequelize(process.env.POSTGRES_URI! , {
  dialect: "postgres",
  logging: false, // Disable SQL query logging in the console
});

export default sequelize;


