import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

type Category = {
  _id: string;
  name: string;
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  
  useEffect(() => {
    load();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) return;
    await api.post("/categories", { name });
    setName("");
    load();
  };

  const deleteCategory = async (id: string) => {
    try {
      await api.delete(`/categories/${id}`);
      alert("Category deleted");
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 min-h-screen">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Categories</h1>
        <p className="text-gray-500 mt-1">Organize property types like Villas, Apartments, or Penthouses.</p>
      </div>

      <div className="p-2 max-w-7xl mb-6 mx-auto bg-gray-50/50">
        <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-white border border-gray-200 text-sm font-semibold 
              text-gray-700 hover:bg-gray-50 hover:shadow transition"
          >
            ← Back to Dashboard
        </button>
      </div>

      {/* ADD CATEGORY INPUT */}
      <div className="flex gap-3 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Luxury Villa"
          className="flex-1 bg-transparent px-4 py-3 outline-none text-gray-700 font-medium placeholder:text-gray-400"
        />
        <button
          onClick={addCategory}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all active:scale-95 shadow-md shadow-gray-200"
        >
          Add
        </button>
      </div>

      {/* CATEGORIES LIST */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-4 pb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Category Name</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Actions</span>
        </div>
        
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="group flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-blue-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                {cat.name}
              </span>
            </div>
            
            <button
              onClick={() => deleteCategory(cat._id)}
              className="text-sm font-medium text-gray-400 hover:text-red-600 px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
            >
              Remove
            </button>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="py-12 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 italic">No categories created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}