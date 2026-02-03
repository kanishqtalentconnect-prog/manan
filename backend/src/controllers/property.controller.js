import Property from "../models/Property.js";
import redis from "../config/redis.js";

export const createProperty = async (req, res) => {
  try {
    const imageUrls = req.files?.map((file) => file.path);

    const property = await Property.create({
      ...req.body,
      images: imageUrls,
    });

    // ❌ invalidate cache
    await redis.del("properties:all");

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
    const imageUrls = req.files?.map((file) => file.path);
    const updatedData = { ...req.body };

    if (imageUrls?.length) {
      updatedData.images = imageUrls;
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // ❌ invalidate cache
    await redis.del("properties:all");
    await redis.del(`property:${req.params.id}`);

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

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
