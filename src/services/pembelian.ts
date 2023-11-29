import { api } from "./core";
import { PembelianType } from "@/types/pembelian";

export const pembelianService = {
  getAll() {
    return api.get<{ data: PembelianType[] }>("/detail-pembelian");
  },
  post(data: any) {
    return api.post("/pembelian", data);
  },
  put(request: { id: number; body: any }) {
    return api.put("/detail-pembelian/" + request.id, request.body);
  },
  delete(id: number) {
    return api.delete("/pembeli/" + id);
  },
};
