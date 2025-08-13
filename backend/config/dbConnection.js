import mongoose from "mongoose";

const dbConnection = () => {
  return mongoose.connect(process.env.MONGO_CLOUD_URI, {
    dbName : 'BLOGGING_WEB_APP'
  });
};

export default dbConnection