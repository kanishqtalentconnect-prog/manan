import api from "./axios";

export const createProperty = (data: FormData) =>
  api.post("/properties", data);
