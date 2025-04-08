import { v2 as cloudinary } from "cloudinary";
import { BaseError } from "./errors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "find-it-posts",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);

    throw new BaseError(
      "Error uploading image to Cloudinary",
      "IMAGEUPLOADERROR",
      500
    );
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);

    throw new BaseError(
      "Error deleting image from Cloudinary",
      "IMAGEDELETEERROR",
      500
    );
  }
};

export default cloudinary;
