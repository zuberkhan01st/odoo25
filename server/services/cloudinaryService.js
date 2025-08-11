import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image to Cloudinary
export const uploadImage = async (filePath, folder = 'quickcourt') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });
    return result;
  } catch (err) {
    throw new Error('Cloudinary upload failed: ' + err.message);
  }
};

// Delete an image from Cloudinary by public_id
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    throw new Error('Cloudinary delete failed: ' + err.message);
  }
};
