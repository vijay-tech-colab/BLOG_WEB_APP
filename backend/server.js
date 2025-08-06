import app from "./app.js";
import dbConnection from "./config/dbConnection.js";
import ImageOperation from "./services/cloudinarySetup.js";


ImageOperation.configureCloudinary(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

app.listen(5000, () => {
  dbConnection().then((res) => {
      console.log("Database connection successfully");
    })
    .catch((err) => console.log(err));
  console.log("server running...");
});
