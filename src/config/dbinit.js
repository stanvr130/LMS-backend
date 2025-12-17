import db from '../models/index.js';

export const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to Clever Cloud established.");

    if (process.env.NODE_ENV === "development") {
      await db.sequelize.sync({ alter: false });
      console.log("Database models synced.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};