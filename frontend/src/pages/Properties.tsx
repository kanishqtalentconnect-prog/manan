import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    api.get("/properties").then((res) => setProperties(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {properties.map((p) => (
        <div key={p._id} className="border p-3">
          <img src={p.images?.[0]} className="h-40 w-full object-cover" />
          <h2 className="font-bold">{p.title}</h2>
        </div>
      ))}
    </div>
  );
}
