type Props = {
  onChange: (files: FileList | null) => void;
};

export default function ImageUpload({ onChange }: Props) {
  return (
    <div>
      <label className="block font-medium mb-1">Property Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onChange(e.target.files)}
      />
    </div>
  );
}
