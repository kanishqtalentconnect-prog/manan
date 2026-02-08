import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import redisClient from "../utils/redis.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    // detect content uploads
    const CONTENT_SECTIONS = ["hero", "hero2", "hero3", "hero4", "about"];
    const isContent = CONTENT_SECTIONS.includes(req.body.section);

    const baseFolder = isContent ? "content" : "properties";

    return {
      folder: isVideo
        ? `${baseFolder}/videos`
        : `${baseFolder}/images`,
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo
        ? ["mp4", "mov", "webm"]
        : ["jpg", "jpeg", "png", "webp"],
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default upload;
