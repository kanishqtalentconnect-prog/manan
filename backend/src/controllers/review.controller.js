import Review from "../models/Review.js";
import redis from "../utils/redis.js";
import cloudinary from "../config/cloudinary.js";

/* ================= CREATE REVIEW ================= */
export const createPublicReview = async (req, res) => {
  try {
    const { name, email, description, propertyBought, rating, address } =
      req.body;

    if (!name || !email || !description || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "manan/reviews" }
      );

      imageUrl = result.secure_url;
    }

    await Review.create({
      name,
      email,
      description,
      propertyBought,
      rating: Number(rating),
      address,
      image: imageUrl,
      isVerified: false,
    });

    res.status(201).json({
      message: "Review submitted for verification",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createAdminReview = async (req, res) => {
  try {
    const { name, email, description, propertyBought, rating, address } =
      req.body;

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "manan/reviews" }
      );

      imageUrl = result.secure_url;
    }

    await Review.create({
      name,
      email,
      description,
      propertyBought,
      rating: Number(rating),
      address,
      image: imageUrl,
      isVerified: true,
    });

    await redis.del("reviews:verified");

    res.status(201).json({
      message: "Review added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET VERIFIED REVIEWS ================= */
export const getVerifiedReviews = async (req, res) => {
  try {
    const cacheKey = "reviews:verified";

    const cache = await redis.get(cacheKey);

    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const reviews = await Review.find({ isVerified: true })
      .sort({ createdAt: -1 })
      .lean();

    await redis.set(cacheKey, JSON.stringify(reviews), "EX", 3600);

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= VERIFY REVIEW (ADMIN) ================= */
export const verifyReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Clear cache
    await redis.del("reviews:verified");

    res.json({ message: "Review verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET ALL REVIEWS (ADMIN) ================= */
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
