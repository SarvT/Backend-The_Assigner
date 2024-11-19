import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET, 
});

const uploadOnCloud = async (filePath) => {
  // correcting the url of image file
  const newFilePath = path.normalize(filePath).replace(/\\/g, "/");
  try {
    // check if file is there
    if (!fs.existsSync(newFilePath)) {
      console.error("File does not exist:", newFilePath);
      return res.status(400).json({ message: "File not found." });
    }
    // get the response file
    const response = await cloudinary.uploader.upload(newFilePath, {
      resource_type: "auto",
    });
    // delete file from server
    fs.unlinkSync(newFilePath);
    return response;
  } catch (error) {
    // delete file from server
    fs.unlinkSync(newFilePath);
    console.log("file upload failed: " + error.message);
    return null;
  }
};
export { uploadOnCloud };
