import { v2 as cloudinary } from "cloudinary";
import CustomErrorHandler from "../utils/errorHandler.js";

class ImageOperation {
  constructor(url) {
    this.url = url;
  }

  static configureCloudinary(cloud_name, api_key, api_secret) {
    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
    });
  }

  async saveImage(folder = "default_folder") {
    try {
      const result = await cloudinary.uploader.upload(this.url, {
        folder,
      });
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } catch (error) {
      throw new CustomErrorHandler(error.message, 500);
    }
  }

  static async deleteImage(public_id) {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return result;
    } catch (error) {
      throw new CustomErrorHandler(error.message, 500);
    }
  }
}

export default ImageOperation;
