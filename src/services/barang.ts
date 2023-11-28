import { BarangType } from "@/types/barangType";
import { api } from "./core";

export const barangService = {
  getAll() {
    return api.get<{ data: BarangType[] }>("/barang");
  },
  post(data: any) {
    return api.post("/barang", data);
  },
  put(request: { id: number; body: any }) {
    return api.put("/barang/" + request.id, request.body);
  },
  delete(id: number) {
    return api.delete("/barang/" + id);
  },
};
