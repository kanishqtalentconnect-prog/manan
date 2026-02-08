import Content from "../models/Content.js";
import redisClient from "../utils/redis.js";

export const upsertContent = async (req, res) => {
  try {
    const { section, removedMedia } = req.body;

    if (!section) {
      return res.status(400).json({ message: "Section is required" });
    }

    const media =
      req.files?.map((file) => ({
        url: file.path,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      })) || [];

    const updateQuery = {
      section,
    };

    // 🗑 Remove selected media
    if (removedMedia) {
      const parsed = JSON.parse(removedMedia);
      updateQuery.$pull = {
        media: { url: { $in: parsed } },
      };
    }

    // ➕ Add new media
    if (media.length) {
      updateQuery.$push = {
        media: { $each: media },
      };
    }

    const content = await Content.findOneAndUpdate(
      { section },
      updateQuery,
      { upsert: true, new: true }
    );

    // 🔥 Clear Redis cache for this section
    await redisClient.del(`content:${section}`);

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getContentBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const CACHE_KEY = `content:${section}`;

    // 1️⃣ Redis first
    const cached = await redisClient.get(CACHE_KEY);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // 2️⃣ DB fallback
    const content = await Content.findOne({
      section,
      isActive: true,
    });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // 3️⃣ Cache for 5 minutes
    await redisClient.setEx(
      CACHE_KEY,
      300,
      JSON.stringify(content)
    );

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
