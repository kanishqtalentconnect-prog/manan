import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import MediaUpload from "../components/admin/MediaUpload";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

type Content = {
  section: string;
  media?: MediaItem[];
};

const SECTIONS = ["hero", "about", "hero2", "hero3"];

export default function ContentManagement() {
  const [section, setSection] = useState("hero");
  const [content, setContent] = useState<Content | null>(null);
  const [uploadKey, setUploadKey] = useState(0);
  const navigate = useNavigate();
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [removedMedia, setRemovedMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchContent(section);
  }, [section]);

  const fetchContent = async (sec: string) => {
    try {
      const res = await api.get(`/content/${sec}`);
      setContent(res.data);
      setRemovedMedia([]);
      setMediaFiles([]);
    } catch {
      setContent(null);
    }
  };

  /* ================= SAVE ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("section", section);

      if (removedMedia.length) {
        formData.append("removedMedia", JSON.stringify(removedMedia));
      }

      mediaFiles.forEach((file) => {
        formData.append("media", file);
      });

      await api.post("/content", formData);
      alert("Successfull");
      setUploadKey((k) => k + 1);
      setMediaFiles([]);
      setRemovedMedia([]);
      fetchContent(section);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Content Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage images and videos for homepage sections
        </p>
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

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* SECTION SIDEBAR */}
        <aside className="bg-white rounded-xl border p-3 space-y-2">
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => setSection(sec)}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition
                ${
                  section === sec
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {sec.toUpperCase()}
            </button>
          ))}
        </aside>

        {/* MAIN PANEL */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border p-6 space-y-8"
        >
          {/* EXISTING MEDIA */}
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Existing Media
            </h2>

            {content?.media && content.media.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {content.media.map((item, i) => {
                  if (removedMedia.includes(item.url)) return null;

                  return (
                    <div
                      key={i}
                      className="relative group rounded-lg overflow-hidden border"
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          className="h-36 w-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="h-36 w-full object-cover"
                          muted
                        />
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setRemovedMedia((prev) => [...prev, item.url])
                        }
                        className="absolute top-2 right-2 bg-black/70 text-white
                                   rounded-full w-8 h-8 flex items-center justify-center
                                   opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No media uploaded for this section
              </p>
            )}
          </div>

          {/* UPLOAD */}
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Add New Media
            </h2>
            <MediaUpload key={uploadKey} onChange={setMediaFiles} />
          </div>

          {/* ACTION */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-black text-white rounded-xl
                         hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
