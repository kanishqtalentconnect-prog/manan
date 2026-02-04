import express from "express";
import Category from "../models/Category.js";
import slugify from "slugify";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import Property from "../models/Property.js";

const router = express.Router();

/* CREATE CATEGORY */
router.post("/", protect, adminOnly, async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
    slug: slugify(name, { lower: true }),
  });

  res.json(category);
});

/* GET ALL CATEGORIES */
router.get("/", async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort("name")
  res.json(categories);
});

/* GET CATEGORY BY ID */
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id)
    .populate("category", "name");

  res.json(category);
});


/* DELETE CATEGORY */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const categoryId = req.params.id;

    // 🔒 Check if any property uses this category
    const usedCount = await Property.countDocuments({
      category: categoryId,
    });

    if (usedCount > 0) {
      return res.status(400).json({
        message: "Cannot delete category. It is used by existing properties.",
      });
    }

    await Category.findByIdAndDelete(categoryId);

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete category" });
  }
});


export default router;
