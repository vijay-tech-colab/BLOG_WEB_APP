import mongoose from "mongoose";

const dbConnection = () => {
  return mongoose.connect(process.env.MONGO_URI);
};

export default dbConnection