import dotenv from "dotenv";
import app from "./app.js";
import dbConnection from "./config/dbConnection.js";
import ImageOperation from "./services/cloudinarySetup.js";
import { initRabbit } from "./utils/rabbitmq.js";
import { startWorker } from "./utils/worker.js";


// Load environment variables
dotenv.config({path : '/backend/config/config.env'});

const PORT = process.env.PORT || 5000;

// 🧩 Start server inside an async function for proper flow
(async () => {
  try {
    // 1️⃣ Connect Database
    await dbConnection();
    console.log("✅ Database connected successfully");

    // 2️⃣ Configure Cloudinary
    ImageOperation.configureCloudinary(
      process.env.CLOUDINARY_CLOUD_NAME,
      process.env.CLOUDINARY_API_KEY,
      process.env.CLOUDINARY_API_SECRET
    );
    console.log("✅ Cloudinary configured");

    // 3️⃣ Connect to RabbitMQ
    await initRabbit();
    console.log("✅ RabbitMQ connected");

    // 4️⃣ Start RabbitMQ Worker (email consumer)
    startWorker();
    console.log("👷 Worker started and listening for messages");

    // 5️⃣ Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server initialization failed:", error);
    process.exit(1); // Exit if something critical fails
  }
})();
