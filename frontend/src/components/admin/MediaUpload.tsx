import { useState, useEffect } from "react";

type PreviewItem = {
  url: string;
  type: "image" | "video";
};

type Props = {
  onChange: (files: FileList | null) => void;
};

export default function MediaUpload({ onChange }: Props) {
  const [preview, setPreview] = useState<PreviewItem[]>([]);

  const handleChange = (files: FileList | null) => {
    onChange(files);

    if (!files) {
      setPreview([]);
      return;
    }

    const items: PreviewItem[] = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setPreview(items);
  };

  // cleanup object URLs (VERY important)
  useEffect(() => {
    return () => {
      preview.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [preview]);

  return (
    <div className="space-y-3">
      <label className="block font-medium text-sm">
        Property Media
      </label>

      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleChange(e.target.files)}
      />

      {/* PREVIEW */}
      {preview.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-2">
          {preview.map((item, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden border"
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  className="w-full h-24 object-cover"
                />
              ) : (
                <>
                  <video
                    src={item.url}
                    className="w-full h-24 object-cover"
                    preload="metadata"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-semibold">
                    VIDEO
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
