import { api } from "./core";
import { StockType } from "@/types/stock";

export const stockService = {
  getAll() {
    return api.get<{ data: StockType[] }>("/stock");
  },
  post(data: any) {
    return api.post("/stock", data);
  },
  delete(id: number) {
    return api.delete("/stock/" + id);
  },
};
