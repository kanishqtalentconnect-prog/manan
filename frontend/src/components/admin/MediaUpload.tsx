import { useState, useEffect } from "react";

type Props = {
  onChange: (files: File[]) => void;
};

type PreviewItem = {
  file: File;
  url: string;
  type: "image" | "video";
};

export default function MediaUpload({ onChange }: Props) {
  const [items, setItems] = useState<PreviewItem[]>([]);

  const handleSelect = (fileList: FileList | null) => {
    if (!fileList) return;

    const selected = Array.from(fileList).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: (file.type.startsWith("video") ? "video" : "image") as "image" | "video",
    }));

    const updated = [...items, ...selected];
    setItems(updated);
    onChange(updated.map((i) => i.file));

    // reset input so same file can be re-selected
    const input = document.getElementById("media-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const removeFile = (index: number) => {
    const removed = items[index];
    URL.revokeObjectURL(removed.url);

    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange(updated.map((i) => i.file));
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [items]);

  return (
    <div className="space-y-3">
      <label className="block font-medium text-sm">
        Property Media
      </label>

      {/* Hidden input */}
      <input
        type="file"
        id="media-upload"
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleSelect(e.target.files)}
        className="hidden"
      />

      {/* Button */}
      <label
        htmlFor="media-upload"
        className="inline-flex items-center px-4 py-2 
                   bg-black text-white rounded-lg 
                   cursor-pointer hover:bg-gray-800 transition"
      >
        Select Media
      </label>

      {/* PREVIEW GRID */}
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {items.map((item, index) => (
            <div key={index} className="relative group rounded overflow-hidden border">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  className="h-24 w-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  className="h-24 w-full object-cover"
                  muted
                />
              )}

              {/* REMOVE */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 
                           bg-black/70 text-white 
                           rounded-full w-7 h-7 
                           flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
