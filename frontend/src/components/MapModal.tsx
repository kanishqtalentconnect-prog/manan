type Props = {
  url: string;
  onClose: () => void;
};

export default function MapModal({ url, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-3xl p-4 relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold"
        >
          ✕
        </button>

        <iframe
          src={url}
          className="w-full h-100 rounded-lg"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}
