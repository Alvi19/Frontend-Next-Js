import { api } from "./core";
import { HutangType } from "@/types/hutang";

export const hutangService = {
  getAll() {
    return api.get<{ data: HutangType[] }>("/hutang");
  },
  post(data: any) {
    return api.post("/hutang", data);
  },
  put(request: { id: number; body: any }) {
    return api.put("/hutang/" + request.id, request.body);
  },
  delete(id: number) {
    return api.delete("/hutang/" + id);
  },
};
