import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {
    const imageUrls = req.files?.map((file) => file.path);

    const property = await Property.create({
      ...req.body,
      images: imageUrls,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllProperties = async (req, res) => {
  const properties = await Property.find().populate("category");
  res.json(properties);
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("category");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE FILES:", req.files);

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

    res.json(property);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      message: error.message || "Update failed",
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
