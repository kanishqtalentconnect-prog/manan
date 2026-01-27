import { useState, useEffect } from "react";
import Input from "../Input";
import ImageUpload from "./ImageUpload";
import api from "../../api/axios";

type Property = {
  _id: string;
  title: string;
  description: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  dimensions?: string;
  category?: string;
  googleMapUrl?: string;
  images?: string[];
};

type Props = {
  initialData?: Property;
  onSuccess?: () => void;
};

type Category = {
  _id: string;
  name: string;
};


export default function PropertyForm({ initialData, onSuccess }: Props) {
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    bedrooms: initialData?.bedrooms || "",
    bathrooms: initialData?.bathrooms || "",
    area: initialData?.area || "",
    dimensions: initialData?.dimensions || "",
    category: initialData?.category ||"",
    googleMapUrl: initialData?.googleMapUrl || "",
  });

  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
  api.get("/categories").then(res => setCategories(res.data));
  }, []);


  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        bedrooms: initialData.bedrooms || "",
        bathrooms: initialData.bathrooms || "",
        area: initialData.area || "",
        dimensions: initialData.dimensions || "",
        category: initialData?.category ||"",
        googleMapUrl: initialData.googleMapUrl || "",
      });
    }
  }, [initialData]);

  const existingImages = initialData?.images ?? [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", String(form.price));
      if (form.category === "land") {
        formData.append("dimensions", form.dimensions);
      } else {
        formData.append("bedrooms", String(form.bedrooms));
        formData.append("bathrooms", String(form.bathrooms));
        formData.append("area", String(form.area));
      }

      if (form.googleMapUrl) {
        formData.append("googleMapUrl", form.googleMapUrl);
      }

      if (images) {
        Array.from(images).forEach((img) =>
          formData.append("images", img)
        );
      }

      if (initialData) {
        await api.put(`/properties/${initialData._id}`, formData);
        alert("Property updated successfully");
      } else {
        await api.post("/properties", formData);
        alert("Property added successfully");
      }
      onSuccess?.();
    } catch (err: any) {
      console.error("FULL AXIOS ERROR >>>", err);

      if (err.response) {
        alert(
          "STATUS: " +
            err.response.status +
            "\nDATA: " +
            JSON.stringify(err.response.data, null, 2)
        );
      } else if (err.request) {
        alert("NO RESPONSE FROM SERVER");
      } else {
        alert("AXIOS SETUP ERROR: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 space-y-5"
    >
      {/* TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property Title
        </label>
        <Input
          name="title"
          placeholder="Eg. Luxury 3 BHK Villa"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property Description
        </label>
        <textarea
          name="description"
          placeholder={`Write detailed description...
    • Location advantages
    • Amenities
    • Nearby facilities`}
          value={form.description}
          onChange={handleChange}
          rows={6}
          required
          className="w-full border rounded-lg p-3 resize-y focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* PRICE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (₹)
        </label>
        <Input
          name="price"
          type="number"
          placeholder="Eg. 8500000"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* CONDITIONAL PROPERTY DETAILS */}
      {form.category !== "land" ? (
        <>
          {/* BEDROOMS + BATHROOMS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <Input
                name="bedrooms"
                type="number"
                placeholder="Eg. 3"
                value={form.bedrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <Input
                name="bathrooms"
                type="number"
                placeholder="Eg. 2"
                value={form.bathrooms}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* AREA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area (sq ft)
            </label>
            <Input
              name="area"
              type="number"
              placeholder="Eg. 1450"
              value={form.area}
              onChange={handleChange}
              required
            />
          </div>
        </>
      ) : (
        <>
          {/* LAND DIMENSIONS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Dimensions
            </label>
            <Input
              name="dimensions"
              placeholder="Eg. 40 x 60 ft"
              value={form.dimensions}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}


      {/* GOOGLE MAP */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Google Maps Embed URL
        </label>
        <Input
          name="googleMapUrl"
          placeholder="Paste Google Maps iframe src URL"
          value={form.googleMapUrl}
          onChange={handleChange}
        />
      </div>

      {/* Category  */}
      <label className="block text-sm font-semibold">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>


      {/* EXISTING IMAGES */}
      {existingImages.length > 0 && (
        <div>
          <p className="font-medium mb-2">Existing Images</p>

          <div className="grid grid-cols-3 gap-3">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-24 w-full object-cover rounded"
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Uploading new images will replace existing images
          </p>
        </div>
      )}


      {/* IMAGE UPLOAD */}
      <div>
        <ImageUpload onChange={setImages} />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? "Uploading..." : initialData ? "Update Property" : "Add Property"}
      </button>
    </form>

  );
}
