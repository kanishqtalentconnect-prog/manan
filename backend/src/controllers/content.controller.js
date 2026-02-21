import Content from "../models/Content.js";
import redisClient from "../utils/redis.js";

export const upsertContent = async (req, res) => {
  try {
    const { section, removedMedia } = req.body;

    if (!section) {
      return res.status(400).json({ message: "Section is required" });
    }

    let content = await Content.findOne({ section });

    if (!content) {
      content = new Content({ section, media: [] });
    }

    // 🗑 Remove media
    if (removedMedia) {
      const parsed = JSON.parse(removedMedia);
      content.media = content.media.filter(
        (item) => !parsed.includes(item.url)
      );
    }

    // ➕ Add new media
    if (req.files?.length) {
      const newMedia = req.files.map((file) => ({
        url: file.path,
        type: file.mimetype.startsWith("video")
          ? "video"
          : "image",
      }));

      content.media.push(...newMedia);
    }

    await content.save();

    // 🔥 Clear Redis cache
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
