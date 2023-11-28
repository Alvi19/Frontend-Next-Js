import { SuplierType } from "@/types/suplier";
import { api } from "./core";

export const suplierService = {
  getAll() {
    return api.get<{ data: SuplierType[] }>("/suplier");
  },
  post(data: any) {
    return api.post("/suplier", data);
  },
  put(request: { id: number; body: any }) {
    return api.put("/suplier/" + request.id, request.body);
  },
  delete(id: number) {
    return api.delete("/suplier/" + id);
  },
};
