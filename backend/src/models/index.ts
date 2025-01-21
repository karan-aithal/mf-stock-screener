import sequelize from "../config/db";
import User from "./userModel";

// Initialize all models
const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    // Sync all models
    await sequelize.sync({ alter: true }); // Automatically update the schema
    console.log("All models synchronized!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};


export { sequelize, User, initModels };

// const initDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected!");

//     // Sync models
//     await User.sync({ alter: true });
//     console.log("User table synced!");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// };

// initDB();


