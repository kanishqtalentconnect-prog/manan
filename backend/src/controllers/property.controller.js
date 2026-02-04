import Property from "../models/Property.js";
import redis from "../config/redis.js";
import redisClient from "../utils/redis.js";
export const createProperty = async (req, res) => {
  try {
    const media =
      req.files?.map((file) => ({
        url: file.path,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      })) || [];

    const property = await Property.create({
      ...req.body,
      media,
    });

    // invalidate cache
    await redis.del("properties:all");
    await redisClient.del("admin:stats"); // 👈 ADD THIS

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  const cacheKey = "properties:all";

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const properties = await Property.find()
      .populate("category")
      .sort({ createdAt: -1 });

    await redis.set(
      cacheKey,
      JSON.stringify(properties),
      "EX",
      300 // 5 minutes
    );

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `property:${id}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const property = await Property.findById(id).populate("category");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await redis.set(
      cacheKey,
      JSON.stringify(property),
      "EX",
      300
    );

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProperty = async (req, res) => {
  try {
    const removedMedia = req.body.removedMedia
      ? JSON.parse(req.body.removedMedia)
      : [];

    const newMedia =
      req.files?.map((file) => ({
        url: file.path,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      })) || [];

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // ❌ Remove deleted media
    if (removedMedia.length) {
      property.media = property.media.filter(
        (item) => !removedMedia.includes(item.url)
      );
    }

    // ➕ Add newly uploaded media
    if (newMedia.length) {
      property.media.push(...newMedia);
    }

    // 📝 Update other fields
    Object.assign(property, req.body);

    await property.save();

    // invalidate cache
    await redis.del("properties:all");
    await redis.del(`property:${req.params.id}`);
    await redisClient.del("admin:stats"); // 👈 ADD THIS

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message || "Update failed" });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await redis.del("properties:all");
    await redis.del(`property:${req.params.id}`);
    await redisClient.del("admin:stats"); // 👈 ADD THIS

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
