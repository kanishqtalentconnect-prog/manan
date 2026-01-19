import { useState, useEffect } from "react";
import Input from "../Input";
import ImageUpload from "./ImageUpload";
import api from "../../api/axios";

type Props = {
  initialData?: any;
  onSuccess?: () => void;
};

export default function PropertyForm({ initialData, onSuccess }: Props) {
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    price: initialData?.price || "",
    bedrooms: initialData?.bedrooms || "",
    bathrooms: initialData?.bathrooms || "",
    propertyType: initialData?.propertyType || "villa",
    googleMapUrl: initialData?.googleMapUrl || "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        price: initialData.price || "",
        bedrooms: initialData.bedrooms || "",
        bathrooms: initialData.bathrooms || "",
        propertyType: initialData.propertyType || "villa",
        googleMapUrl: initialData.googleMapUrl || "",
      });
    }
  }, [initialData]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("price", String(form.price));
      formData.append("bedrooms", String(form.bedrooms));
      formData.append("bathrooms", String(form.bathrooms));
      formData.append("propertyType", form.propertyType);

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
      className="bg-white shadow rounded-xl p-6 space-y-4"
    >
      <Input
        name="title"
        placeholder="Property Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <Input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          required
        />
        <Input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        name="googleMapUrl"
        placeholder="Google Maps Embed URL"
        value={form.googleMapUrl}
        onChange={handleChange}
      />
      <select
        name="propertyType"
        className="w-full border p-3 rounded"
        value={form.propertyType}
        onChange={handleChange}
      >
        <option value="villa">Villa</option>
        <option value="flat">Flat</option>
        <option value="cottage">Cottage</option>
      </select>

      {initialData?.images?.length > 0 && (
        <div>
          <p className="font-medium mb-2">Existing Images</p>

          <div className="grid grid-cols-3 gap-3">
            {initialData.images.map((img: string, i: number) => (
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

      <ImageUpload onChange={setImages} />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? "Uploading..." : "Add Property"}
      </button>
    </form>
  );
}
