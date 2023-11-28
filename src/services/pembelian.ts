import { api } from "./core";
import { PembelianType } from "@/types/pembelian";

export const pembelianService = {
  getAll() {
    return api.get<{ data: PembelianType[] }>("/detail-pembelian");
  },
  post(data: any) {
    return api.post("/pembelian", data);
  },
  delete(id: number) {
    return api.delete("/pembeli/" + id);
  },
};
