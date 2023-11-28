import Layout from "@/components/layout/layout";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stockService } from "./../services/stock";
import { useFormik } from "formik";
import { barangService } from "./../services/barang";
import { StockType } from "@/types/stock";

const Stock = () => {
  const [selectData, setSelectData] = React.useState<StockType | null>(null);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: stockService.getAll,
    queryKey: ["list-stock"],
  });

  const { data: barang } = useQuery({
    queryFn: barangService.getAll,
    queryKey: ["list-barang"],
  });

  const { mutate } = useMutation({
    mutationFn: stockService.post,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-stock"] });
      formik.resetForm();
    },
  });

  const { mutate: editItem } = useMutation({
    mutationFn: stockService.put,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-stock"] });
      formik.resetForm();
      setSelectData(null);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: stockService.delete,
    onSuccess: () => {
      (document?.getElementById("my_modal_2") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-stock"] });
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      kodebrg: "",
      qtybeli: "",
    },
    onSubmit: async () => {
      if (selectData) {
        editItem({
          id: selectData.id,
          body: formik.values,
        });
      } else {
        mutate(formik.values);
      }
    },
  });

  const openDialogForm = (data?: StockType | null) => {
    if (data) {
      setSelectData(data);
      formik.setFieldValue("kodebrg", data.kodebrg);
      formik.setFieldValue("qtybeli", data.qtybeli);
    }
    (document?.getElementById("my_modal_1") as any).showModal();
  };

  return (
    <Layout>
      <div className="flex">
        <h1 className="mr-2">Data Stock</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            (document?.getElementById("my_modal_1") as any).showModal()
          }
        >
          Tambah Stock
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {selectData ? "Edit" : "Tambah"} Data Stock
          </h3>
          <div className="py-4">
            <form onSubmit={formik.handleSubmit} action="">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Kode Barang</span>
                </label>
                <select
                  name="kodebrg"
                  onChange={formik.handleChange}
                  value={formik.values.kodebrg}
                  className="select select-bordered w-full"
                >
                  <option value=""></option>
                  {(barang?.data.data ?? []).map((item, index) => (
                    <option key={index} value={item.kodebrg}>
                      {item.kodebrg}
                    </option>
                  ))}
                </select>
                <label className="label">
                  <span className="label-text">QTY Beli</span>
                </label>
                <input
                  type="number"
                  name="qtybeli"
                  onChange={formik.handleChange}
                  value={formik.values.qtybeli}
                  className="input input-bordered w-full"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-xl mt-3">
                Simpan
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  formik.resetForm();
                  setSelectData(null);
                }}
                className="btn btn-xl"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Data Barang</h3>
          <div className="py-4">Apakah anda ingin menghapus data ini ?</div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-xl">Close</button>
            </form>
            <button
              onClick={() => selectData && deleteItem(selectData.id)}
              className="btn btn-error btn-xl"
            >
              Hapus
            </button>
          </div>
        </div>
      </dialog>

      <div className="justify-center items-center">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Barang</th>
                <th>QTY Beli</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(data?.data.data ?? []).map((item, index) => (
                <tr key={index} className="bg-base-200">
                  <th>{item.id}</th>
                  <td>{item.kodebrg}</td>
                  <td>{item.qtybeli}</td>
                  <td>
                    <button
                      onClick={() => openDialogForm(item)}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => {
                        (
                          document?.getElementById("my_modal_2") as any
                        ).showModal();
                        setSelectData(item);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Stock;
